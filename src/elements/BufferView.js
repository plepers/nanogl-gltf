//@flow

import BaseElement from './BaseElement';
import { TYPE_BUFFER, TYPE_BUFFERVIEW } from '../consts';
import Ref from '../Ref';

import type {ElementType} from '../consts'
import type  Gltf         from '../index'
import type  Buffer       from './Buffer'

export default class BufferView extends BaseElement {

  static TYPE : ElementType = TYPE_BUFFERVIEW;

  byteOffset : number;
  byteLength : number;
  byteStride : number;
  target     : number;
  buffer     : Buffer;

  constructor( gltf:Gltf , data:any ){

    super( gltf, data );

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

    this.buffer  = this.gltf.getElement<Buffer>( TYPE_BUFFER, data.buffer );

  }


  getByteOffset():number{
    return this.byteOffset + this.buffer._byteOffset;
  }

 

}

 

