
//@ts-check

/**
 * @typedef {Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array} TypedArray
 */

import BaseElement from './BaseElement';
import Ref from '../Ref';
import { TYPE_BUFFERVIEW, TYPE_ACCESSOR } from '../consts';
import Assert from '../lib/assert';



const TYPE_SIZE_MAP = {
  'SCALAR': 1,
  'VEC2':   2,
  'VEC3':   3,
  'VEC4':   4,
  'MAT2':   4,
  'MAT3':   9,
  'MAT4':   16
}

const ARRAY_TYPES = {
  5120:  Int8Array, // force unsigned???
  5121:  Uint8Array,
  5122:  Int16Array,
  5123:  Uint16Array,
  5125:  Uint32Array,
  5126:  Float32Array,
}


//https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#animations
const NORMALIZE_FUNCS = {
  5120 : c => Math.max(c / 127.0, -1.0)	,
  5121 : c => c / 255.0	,
  5122 : c => Math.max(c / 32767.0, -1.0)	,
  5123 : c => c / 65535.0	,
  5125:  null,
  5126:  null,
}


function getArrayForDataType( t )
{
  const a = ARRAY_TYPES[t];
  Assert.isDefined(a);
  return a;
}  


function getBytesLengthForDataType( t )
{
  return getArrayForDataType(t).BYTES_PER_ELEMENT;
}  


function getSizeForComponentType( t )
{
  const a = TYPE_SIZE_MAP[t];
  Assert.isDefined(a);
  return a;
}  


class Sparse{


  constructor( accessor, data ){
    this.accessor = accessor;

    let iData = data.indices;
    
    this.indices = new Accessor( accessor.gltf, {
      bufferView   : iData   .bufferView ,
      byteOffset   : iData   .byteOffset ,
      componentType: iData   .componentType,
      count        : data    .count,
      normalized   : accessor.normalized,
      type         : "SCALAR"
    });
    
    let vData = data.values;
    
    this.values = new Accessor( accessor.gltf, {
      bufferView   : vData   .bufferView ,
      byteOffset   : vData   .byteOffset ,
      count        : data    .count,
      componentType: accessor.componentType,
      normalized   : accessor.normalized,
      type         : accessor.type
    });
    
    this.indicesSet = null;
    this.indicesMap = null;
  }
  
  
  resolveReferences(){
    const iset = this.indicesSet = new Set();
    const imap = this.indicesMap = new Map();
    const indices = this.indices;

    this.indices.resolveReferences();
    this.values .resolveReferences();
    
    const count = indices.count;
    const holder = indices.createElementHolder();
    for (var i = 0; i < count; i++) {
      indices.getValue(holder, i )
      iset.add( holder[0] );
      imap.set( holder[0], i );
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


  static TYPE = TYPE_ACCESSOR


  constructor( gltf, data ){
    super( gltf, data );


    this.$bufferView    = null;
    this.bufferView     = null;

    if( data.bufferView !== undefined ){
      this.$bufferView = new Ref( gltf, TYPE_BUFFERVIEW, data.bufferView );
    }

    const { 
      byteOffset  = 0,
      normalized  = false,
    } = data;

    this.componentType  = data.componentType;
    this.count          = data.count;
    this.type           = data.type;
    this.max            = data.max;
    this.min            = data.min;
    this.byteOffset     = byteOffset;
    this.normalized     = normalized;

    this.sparse = null;
    if( data.sparse !== undefined ){
      this.sparse         = new Sparse( this, data.sparse );
    }

    this._valueHolder = this.createElementHolder();
    this._stride = 0;
    this._normalizeFunc = NORMALIZE_FUNCS[this.componentType];

  }


  get numComps(){
    return getSizeForComponentType(this.type);
  }

  get bytesPerElem(){
    return getBytesLengthForDataType(this.componentType);
  }
 


  resolveReferences(){

    const Arr = getArrayForDataType(this.componentType);

    if( this.$bufferView !== null ){
      this.bufferView = this.$bufferView.resolve();
    } else {
      // sparse init
      this.bufferView = new Arr( this.count * this.numComps );
    }
    
    if( this.sparse ){
      this.sparse.resolveReferences();
    }

    if( this.bufferView.byteStride === 0 ){
      this._stride      = this.numComps * this.bytesPerElem;
      this._strideElem  = this.numComps;
    } else {
      this._stride      = this.bufferView.byteStride;
      this._strideElem  = this._stride / Arr.BYTES_PER_ELEMENT;
      Assert.isTrue( this._strideElem === Math.round( this._strideElem ) );
    }

    this._array = new Arr( this.bufferView.buffer._bytes, this.byteOffset + this.bufferView.getByteOffset(), this.count * this._strideElem );
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
  createElementHolder(normalized = this.normalized){
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
  getScalar( index, normalized = this.normalized ){
    
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
  getRawScalar( index ){
    const offset = this._strideElem * index;
    return this._array[offset];
  }



  /**
   * Copy accessor value at the given index to output array
   * @param {TypedArray} out output value
   * @param {number} index 
   * @param {boolean} normalized 
   */
  getValue( out, index, normalized = this.normalized ){

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

  /**
   * Copy accessor value at the given index to output array. Skip sparse resolve
   * @param {TypedArray} out output value
   * @param {number} index 
   */
  getRawValue( out, index ){
    const offset = this._strideElem * index;
    const ncomps = this.numComps;
    for (var i = 0; i < ncomps; i++) {
      out[i] = this._array[i+offset];
    }
  }


  // returnValue(index){
  //   this.getValue( this._valueHolder, index );
  //   return this._valueHolder;
  // }

  /**
   * 
   * @param {TypedArray} out output value
   * @param {TypedArray} raw 
   */
  _normalize( out, raw ){
    const fn = this._normalizeFunc;
    const ncomps = this.numComps;
    for (var i = 0; i < ncomps; i++) {
      out[i] = fn( raw[i] );
    }
  }




}
