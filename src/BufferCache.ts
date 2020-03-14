import BufferView from "./elements/BufferView";
import { GLContext } from "nanogl/types";
import Assert from "./lib/assert";


export const enum ArrayBufferType {
  ARRAY_BUFFER = 0x8892,
  ELEMENT_ARRAY_BUFFER = 0x8893 
}

export default class BufferCache {

  readonly gl: GLContext;

  private _buffers : Record<number, WebGLBuffer> 
  // private _ibuffers : Record<number, WebGLBuffer> 

  constructor( gl : GLContext ){
    this.gl = gl;

    this._buffers = {};
    // this._abuffers = {};
  }


  getBuffer( bufferView : BufferView, target : ArrayBufferType ) : WebGLBuffer {
    
    // const dict = (target == ArrayBufferType.ARRAY_BUFFER) ? this._abuffers : this._ibuffers;
    
    const uid = bufferView.uuid;
    let glBuffer= this._buffers[uid];

    if( glBuffer === undefined ){

      const gl = this.gl;
      const data = new Uint8Array( 
        bufferView.buffer._bytes, 
        bufferView.getByteOffset(), 
        bufferView.byteLength 
      );
    
      glBuffer = gl.createBuffer();
      gl.bindBuffer(target, glBuffer);
      gl.bufferData(target, data, gl.STATIC_DRAW );
      gl.bindBuffer(target, null);

      this._buffers[uid] = glBuffer;
    }

    // TODO: assert target match if existing buffer

    return glBuffer;
  } 

}