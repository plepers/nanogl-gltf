
import Assert from '../lib/assert';
import BufferView from './BufferView'
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import AccessorSparse from './AccessorSparse';
import { IElement } from '../types/Elements';
import { TypedArrayConstructor, TypedArray } from '../types/TypedArray';




type normalizeFunc = (n:number)=>number;




const TYPE_SIZE_MAP = {
  'SCALAR': 1,
  'VEC2':   2,
  'VEC3':   3,
  'VEC4':   4,
  'MAT2':   4,
  'MAT3':   9,
  'MAT4':   16
}

const ARRAY_TYPES = new Map<Gltf2.AccessorComponentType, TypedArrayConstructor >([
  [Gltf2.AccessorComponentType.BYTE           , Int8Array    ], // force unsigned???
  [Gltf2.AccessorComponentType.UNSIGNED_BYTE  , Uint8Array   ],
  [Gltf2.AccessorComponentType.SHORT          , Int16Array   ],
  [Gltf2.AccessorComponentType.UNSIGNED_SHORT , Uint16Array  ],
  [Gltf2.AccessorComponentType.UNSIGNED_INT   , Uint32Array  ],
  [Gltf2.AccessorComponentType.FLOAT          , Float32Array ],
]);


//https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md_animations
const NORMALIZE_FUNCS = new Map<Gltf2.AccessorComponentType, normalizeFunc>([
  [Gltf2.AccessorComponentType.BYTE           , c => Math.max(c / 127.0, -1.0)	 ],
  [Gltf2.AccessorComponentType.UNSIGNED_BYTE  , c => c / 255.0	 ],
  [Gltf2.AccessorComponentType.SHORT          , c => Math.max(c / 32767.0, -1.0)	 ],
  [Gltf2.AccessorComponentType.UNSIGNED_SHORT , c => c / 65535.0	 ],
  [Gltf2.AccessorComponentType.UNSIGNED_INT   , c => c ],
  [Gltf2.AccessorComponentType.FLOAT          , c => c ],
]);


function getNormalizeFunction( t:Gltf2.AccessorComponentType ) : normalizeFunc 
{
  const a : normalizeFunc = NORMALIZE_FUNCS.get(t);
  Assert.isDefined(a);
  return a;
}


export function getArrayForDataType( t:Gltf2.AccessorComponentType ) : TypedArrayConstructor
{
  const a : TypedArrayConstructor = ARRAY_TYPES.get(t);
  Assert.isDefined(a);
  return a;
}  


function getBytesLengthForDataType( t:Gltf2.AccessorComponentType ):number
{
  return getArrayForDataType(t).BYTES_PER_ELEMENT;
}  


function getSizeForComponentType( t:Gltf2.AccessorType )
{
  const a = TYPE_SIZE_MAP[t];
  Assert.isDefined(a);
  return a;
}  



export type BaseAccessorData = Gltf2.IAccessor | Gltf2.IAccessorSparseIndices | Gltf2.IAccessorSparseValues;

export class BaseAccessor {

  normalized     : boolean      = false;
  byteOffset     : number       = 0;
  count          : number       = 0;
  _stride        : number       = 0;
  _strideElem    : number       = 0;
  componentType  : Gltf2.AccessorComponentType        ;
  type           : Gltf2.AccessorType        ;
  max          ? : number[]    ;
  min          ? : number[]    ;
  bufferView     : BufferView   ;
  _valueHolder   : TypedArray   ;
  _array         : TypedArray   ;
  _normalizeFunc : normalizeFunc;
  sparse         : AccessorSparse|null  ;


  get numComps(){
    return getSizeForComponentType(this.type);
  }

  get bytesPerElem(){
    return getBytesLengthForDataType(this.componentType);
  }
 


  *[Symbol.iterator](){
    const holder = this.createElementHolder();
    for (let i=0; i < this.count; i++) {
      this.getValue( holder, i )
      yield holder;
    }
  }


  
  /**
   * @return {TypedArray} 
   */
  createElementHolder(normalized : boolean = this.normalized) : TypedArray{
    if( normalized ) 
      return new Float32Array( this.numComps );
    else
      return new (getArrayForDataType(this.componentType))(this.numComps);
  }




  /**
   * Copy accessor value at the given index to output array
   * @param {number} index 
   * @param {boolean} normalized 
   */
  getScalar( index :number, normalized : boolean = this.normalized ):number{
    
    let s;
    
    if( this.sparse !== null ){
      s = this.sparse.getRawScalar( index );
    }else{
      s = this.getRawScalar( index );
    }

    if( normalized ){
      s = this._normalizeFunc( s );
    } 
    
    return s;

  }

  /**
   * Copy accessor value at the given index to output array. Skip sparse resolve
   * @param {number} index 
   */
  getRawScalar( index:number ):number{
    const offset = this._strideElem * index;
    return this._array[offset];
  }



  /**
   * Copy accessor value at the given index to output array
   * @param {TypedArray} out output value
   * @param {number} index 
   * @param {boolean} normalized 
   */
  getValue( out:TypedArray, index:number, normalized:boolean = this.normalized ){

    const _out = normalized ? this._valueHolder : out;

    if( this.sparse !== null ){
      this.sparse.getRawValue( _out, index );
    } else {
      this.getRawValue( _out, index );
    }

    if( normalized ){
      this._normalize( out, _out );
    }

  }

  getRawValue( out:TypedArray, index:number ){
    const offset = this._strideElem * index;
    const ncomps = this.numComps;
    for (var i = 0; i < ncomps; i++) {
      out[i] = this._array[i+offset];
    }
  }


  _normalize( out:TypedArray, raw:TypedArray ){
    const fn = this._normalizeFunc;
    const ncomps = this.numComps;
    for (var i = 0; i < ncomps; i++) {
      out[i] = fn( raw[i] );
    }
  }

}



export default class Accessor extends BaseAccessor implements IElement {

  readonly gltftype : GltfTypes.ACCESSOR = GltfTypes.ACCESSOR;
  name        : undefined | string;
  extras      : any   ;

  async parse( gltfLoader:GltfLoader, data:Gltf2.IAccessor ) : Promise<any>{

      
    const { 
      byteOffset  = 0,
      normalized  = false,
    } = data;

    this.normalized     = normalized;
    this.byteOffset     = byteOffset;
    
    this.componentType  = data.componentType;
    this.count          = data.count;
    this.type           = data.type;
    this.max            = data.max;
    this.min            = data.min;
    
    
    
    
    if( data.bufferView !== undefined ){
      this.bufferView     = await gltfLoader.getElement( GltfTypes.BUFFERVIEW, data.bufferView );
      const Arr = getArrayForDataType(this.componentType);

      if( this.bufferView.byteStride === 0 ){
        this._stride      = this.numComps * this.bytesPerElem;
        this._strideElem  = this.numComps;
      } else {
        this._stride      = this.bufferView.byteStride;
        this._strideElem  = this._stride / Arr.BYTES_PER_ELEMENT;
        Assert.isTrue( this._strideElem === Math.round( this._strideElem ) );
      }
      
      this._array = new Arr( this.bufferView.buffer._bytes, this.byteOffset + this.bufferView.getByteOffset(), this.count * this._strideElem );

    } else {
      this.bufferView     = null;
      this._stride        = 0;
      this._strideElem    = 0;
      this._array = this.createElementHolder();
    }


    this.sparse = null;
    if( data.sparse !== undefined ){
      // can't await sparse here because of cyclic dependency ( => sparse await accessor)
      gltfLoader._loadElement( data.sparse ).then( sparse=>this.sparse=sparse );
    }

    this._valueHolder = this.createElementHolder();
    this._normalizeFunc = getNormalizeFunction( this.componentType );

    return Promise.resolve();

  }
}
