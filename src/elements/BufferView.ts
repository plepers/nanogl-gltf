

import BaseElement from './BaseElement';


import  Gltf         from '../index'
import  Buffer       from './Buffer'
import GLArrayBuffer from 'nanogl/arraybuffer';
import GLIndexBuffer from 'nanogl/indexbuffer';
import { GLContext } from 'nanogl/types';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';

export default class BufferView extends BaseElement {

  static TYPE : GltfTypes = GltfTypes.BUFFERVIEW;

  byteOffset : number = 0;
  byteLength : number = 0;
  byteStride : number = 0;
  target     : number = 0;
  buffer     : Buffer;

  parse( gltfLoader:GltfLoader , data:Gltf2.IBufferView ){

    super.parse( gltfLoader, data );

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

    this.buffer  = this.gltf.getElement<Buffer>( GltfTypes.BUFFER, data.buffer );

  }


  getByteOffset():number{
    return this.byteOffset + this.buffer._byteOffset;
  }


  allocateGl( gl: GLContext ){

  }

 

}

 

