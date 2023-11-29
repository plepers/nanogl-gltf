

import  Buffer       from './Buffer'
import { GLContext } from 'nanogl/types';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';


type ELEMENT_ARRAY_BUFFER = 0x8893 
type ARRAY_BUFFER = 0x8892

/**
 * Target of a BufferView, either ARRAY_BUFFER / 34962 (indicating that the data should be used for vertex attributes)
 * or ELEMENT_ARRAY_BUFFER / 34963 (indicating that the data should be used for vertex indices).
 */
export type ArrayBufferTarget = ELEMENT_ARRAY_BUFFER | ARRAY_BUFFER

/**
 * The BufferView element is a view into a Buffer, representing a slice of it,
 * as a Buffer is often used to contain large quantities of different datas not related to each other.
 * A BufferView allows to access only a part of a Buffer and to simplify its access.
 */
export default class BufferView implements IElement {

  readonly gltftype : GltfTypes.BUFFERVIEW = GltfTypes.BUFFERVIEW;
  name        : undefined | string;
  extras      : any   ;
  
  /**
   * Offset of this BufferView in the associated Buffer, in bytes
   */
  byteOffset  = 0;

  /**
   * Length of this BufferView in the associated Buffer, in bytes
   */
  byteLength  = 0;

  /**
   * Stride of this BufferView in the associated Buffer, in bytes
   */
  byteStride  = 0;

  /**
   * Target of this BufferView, may be used to infer the type of the data,
   * either 34962 (used for vertex attributes) or 34963 (used for vertex indices).
   */
  target      = 0;

  /**
   * Associated Buffer element
   */
  buffer     : Buffer;

  /**
   * WebGLBuffer created from the associated BufferView data, used when calling getWebGLBuffer()
   */
  private glBuffer   : WebGLBuffer = null;

  /**
   * WebGLBufferTarget stored when calling getWebGLBuffer()
   */
  private glBufferTarget  = 0;


  /**
   * Parse the BufferView data, load the associated Buffer element and sets the byteOffset, byteLength, byteStride and target attributes.
   * 
   * Is async as it needs to wait for the buffer data to be loaded.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse( gltfLoader:GltfLoader , data:Gltf2.IBufferView ) : Promise<any> {

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

    this.buffer  = await gltfLoader.getElement( GltfTypes.BUFFER, data.buffer );

  }

  /**
   * Get the offset of this BufferView in the associated Buffer, in bytes.
   * Adds the byteOffset of the Buffer if any.
   */
  getByteOffset():number{
    return this.byteOffset + this.buffer._byteOffset;
  }

  /**
   * Create a WebGLBuffer from the associated BufferView data.
   * @param gl GL context to create the WebGLBuffer
   * @param inferedTarget Target to use for the WebGLBuffer
   */
  getWebGLBuffer( gl:GLContext, inferedTarget : ArrayBufferTarget ) : WebGLBuffer {

    if( this.target !== 0 && this.target !== inferedTarget ){
      throw new Error(`BufferView's target ${this.target} doesn't match infered one ${inferedTarget}` );
    }
    
    if( this.glBuffer !== null ){
      if( this.glBufferTarget !== inferedTarget ){
        // Is this really an error?
        throw new Error(`WebglBuffers with different target requested on BufferView` );
      }
    } else {

      const data = new Uint8Array( 
        this.buffer._bytes, 
        this.getByteOffset(), 
        this.byteLength 
      );
        
      this.glBufferTarget = inferedTarget;
      this.glBuffer = gl.createBuffer();

      gl.bindBuffer(inferedTarget, this.glBuffer);
      gl.bufferData(inferedTarget, data, gl.STATIC_DRAW );
      gl.bindBuffer(inferedTarget, null);

    }

    return this.glBuffer;
  }

}
