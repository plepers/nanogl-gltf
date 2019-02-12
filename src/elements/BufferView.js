//@ts-check

import BaseElement from './BaseElement';
import { TYPE_BUFFER, TYPE_BUFFERVIEW } from '../consts';
import Ref from '../Ref';


export default class BufferView extends BaseElement {

  static TYPE = TYPE_BUFFERVIEW;

  constructor( gltf, data ){

    super( gltf, data );

    const {
      byteOffset = 0,
      byteLength,
      byteStride = 0,
      target = 0
    } = data;

    this.byteOffset = byteOffset;
    this.byteLength = byteLength;
    this.byteStride = byteStride;
    this.target     = target;

    this.$buffer = new Ref( gltf, TYPE_BUFFER, data.buffer );
    this.buffer  = null;

  }

  resolveReferences(){
    this.buffer = this.$buffer.resolve(); 
  }

  getByteOffset(){
    return this.byteOffset + this.buffer._byteOffset;
  }

}

 

