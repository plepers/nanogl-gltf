
import BaseElement from './BaseElement';
import { ElementType} from '../consts';
import Assert from '../lib/assert';
import Gltf from '../index'
import BufferView from './BufferView'
import {TypedArrayConstructor, TypedArray} from '../consts'
import { Data_Accessor, Data_AccessorSparse } from '../schema/glTF';

type normalizeFunc = (n:number)=>number;
type CType = 5120 | 5121 | 5122 | 5123 | 5125 | 5126 | number;
type VType = 'SCALAR' | 'VEC2' | 'VEC3' | 'VEC4' | 'MAT2' | 'MAT3' | 'MAT4' | string;



const TYPE_SIZE_MAP = {
  'SCALAR': 1,
  'VEC2':   2,
  'VEC3':   3,
  'VEC4':   4,
  'MAT2':   4,
  'MAT3':   9,
  'MAT4':   16
}

const ARRAY_TYPES = new Map<CType, TypedArrayConstructor >([
  [5120, Int8Array    ], // force unsigned???
  [5121, Uint8Array   ],
  [5122, Int16Array   ],
  [5123, Uint16Array  ],
  [5125, Uint32Array  ],
  [5126, Float32Array ],
]);


//https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md_animations
const NORMALIZE_FUNCS = new Map<CType, normalizeFunc>([
  [5120, c => Math.max(c / 127.0, -1.0)	 ],
  [5121, c => c / 255.0	 ],
  [5122, c => Math.max(c / 32767.0, -1.0)	 ],
  [5123, c => c / 65535.0	 ],
  [5125, c => c ],
  [5126, c => c ],
]);


function getNormalizeFunction( t:CType ) : normalizeFunc 
{
  const a : normalizeFunc = NORMALIZE_FUNCS.get(t);
  Assert.isDefined(a);
  return a;
}


function getArrayForDataType( t:CType ) : TypedArrayConstructor
{
  const a : TypedArrayConstructor = ARRAY_TYPES.get(t);
  Assert.isDefined(a);
  return a;
}  


function getBytesLengthForDataType( t:CType ):number
{
  return getArrayForDataType(t).BYTES_PER_ELEMENT;
}  


function getSizeForComponentType( t:VType )
{
  const a = TYPE_SIZE_MAP[t];
  Assert.isDefined(a);
  return a;
}  


class Sparse{

  accessor:Accessor;
  indices:Accessor;
  values:Accessor;

  indicesSet:Set<number>;
  indicesMap:Map<number, number>;

  constructor( accessor: Accessor, data: Data_AccessorSparse ){
    this.accessor = accessor;

    let iData = data.indices;
    
    this.indices = new Accessor()
    this.indices.parse( accessor.gltf, {
      bufferView   : iData   .bufferView ,
      byteOffset   : iData   .byteOffset ,
      componentType: iData   .componentType,
      count        : data    .count,
      normalized   : accessor.normalized,
      type         : "SCALAR"
    });
    
    let vData = data.values;
    
    this.values = new Accessor();
    this.values.parse( accessor.gltf, {
      bufferView   : vData   .bufferView ,
      byteOffset   : vData   .byteOffset ,
      count        : data    .count,
      componentType: accessor.componentType,
      normalized   : accessor.normalized,
      type         : accessor.type
    });
    

    const iset = this.indicesSet = new Set();
    const imap = this.indicesMap = new Map();


    const indices = this.indices;
    const count = indices.count;
    const holder = indices.createElementHolder();
    
    for (var i = 0; i < count; i++) {
      var j = indices.getScalar( i )
      iset.add( j );
      imap.set( j, i );
    }

  }
  
  


  getRawValue( out, index ){
    const isSparse = this.indicesSet.has( index );
    if( isSparse ){
      this.values.getRawValue( out, this.indicesMap.get(index) );
    }else {
      this.accessor.getRawValue( out, index );
    }
  }
  
  getRawScalar(index) {
    const isSparse = this.indicesSet.has( index );
    if( isSparse ){
      return this.values.getRawScalar( this.indicesMap.get(index) )
    } else {
      return this.accessor.getRawScalar( index );
    }

  }



}


export default class Accessor extends BaseElement {


  static TYPE = ElementType.ACCESSOR

  normalized     : boolean      ;
  byteOffset     : number       ;
  count          : number       ;
  _stride        : number       ;
  _strideElem    : number       ;
  componentType  : CType        ;
  type           : VType        ;
  max            : number[]    ;
  min            : number[]    ;
  bufferView     : BufferView   ;
  sparse         : Sparse|null  ;
  _valueHolder   : TypedArray   ;
  _array         : TypedArray   ;
  _normalizeFunc : normalizeFunc;


  parse( gltf:Gltf, data:Data_Accessor ){
    super.parse( gltf, data );

    
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
      this.bufferView     = this.gltf.getElement( ElementType.BUFFERVIEW, data.bufferView );
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
      this._strideElem    = 0;
      this._array = this.createElementHolder();
    }


    this.sparse = null;
    if( data.sparse !== undefined ){
      this.sparse         = new Sparse( this, data.sparse );
    }

    this._valueHolder = this.createElementHolder();
    this._stride = 0;
    this._normalizeFunc = getNormalizeFunction( this.componentType );

  }





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
