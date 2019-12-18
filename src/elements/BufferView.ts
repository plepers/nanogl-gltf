

import BaseElement from './BaseElement';
import { ElementType } from '../consts';

import  Gltf         from '../index'
import  Buffer       from './Buffer'
import { Data_BufferView } from '../schema/glTF';

export default class BufferView extends BaseElement {

  static TYPE : ElementType = ElementType.BUFFERVIEW;

  byteOffset : number;
  byteLength : number;
  byteStride : number;
  target     : number;
  buffer     : Buffer;

  parse( gltf:Gltf , data:Data_BufferView ){

    super.parse( gltf, data );

    const {
      byteLength,
      byteOffset = 0,
      byteStride = 0,
      target     = 0
    } = data;

    this.byteLength = byteLength;
    this.byteOffset = byteOffset;
    this.byteStride = byteStride;
    this.target     = target;

    this.buffer  = this.gltf.getElement<Buffer>( ElementType.BUFFER, data.buffer );

  }


  getByteOffset():number{
    return this.byteOffset + this.buffer._byteOffset;
  }

 

}

 

