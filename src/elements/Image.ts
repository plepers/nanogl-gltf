


import BufferView from './BufferView';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';
import { AbortSignal, AbortSignalLike } from '@azure/abort-controller';
import { createNativeSignal } from '../lib/cancellation';
import Texture2D from 'nanogl/texture-2d';
import { GLContext } from 'nanogl/types';


const GL_REPEAT                         = 0x2901;
const GL_MIRRORED_REPEAT                = 0x8370;

/**
 * Check if a minFilter mode needs mipmaps.
 * Returns false if the minFilter is GL_NEAREST or GL_LINEAR.
 * @param filter Filtering mode to check
 */
export function filterHasMipmap(filter : GLenum) : boolean {
  return (filter & (1 << 8)) === (1 << 8);
}

/**
 * Check if a wrap mode requires the texture to be a POT (Power Of Two) texture.
 * Returns true if the wrap mode is GL_REPEAT or GL_MIRRORED_REPEAT.
 * @param wrap Wrap mode to check
 */
export function wrapRequirePot(wrap : GLenum ) : boolean {
  return wrap === GL_REPEAT || wrap === GL_MIRRORED_REPEAT;
}

/**
 * Check if a number is a power of 2, useful for texture resize before GPU upload as GPUs usually prefer POT (Power Of Two) textures.
 * @param n Number to check
 */
export function isPowerOf2(n : number ) : boolean {
  return (n != 0 && (n & (n-1)) === 0);
}

function nearestPowerOf2(n:number) : number {
    if( isPowerOf2(n) ) return n;
    if (n % 2 === 1) n++;
    return Math.pow(2.0, Math.round(Math.log(n) / Math.log(2.0)));
}


/**
 * The Image element represents a basic image, contains the image data, used to store textures.
 * Provides a method to setup a Texture2D with the image data, to be used in a WebGL context.
 */
export default class Image implements IElement {

  readonly gltftype: GltfTypes.IMAGE = GltfTypes.IMAGE;
  name: undefined | string;
  extras: any;


  /**
   * URI to the image data, or base64-encoded data URI
   */
  uri?: string;

  /**
   * Absolute path to the image data, used for file fetching
   */
  resolvedUri?: string;

  /**
   * Image's mimeType (PNG or JPEG)
   */
  mimeType?: Gltf2.ImageMimeType;

  /**
   * Associated BufferView element containing the image data, if provided
   */
  bufferView?: BufferView;


  /**
   * Image data, ready to be used by a Texture
   */
  texImageSource: TexImageSource;


  /**
   * Check if the mimeType is not JPEG, used for texture allocation
   */
  get hasAlpha(): boolean {
    return this.mimeType !== Gltf2.ImageMimeType.JPEG
  }


  /**
   * Parse the Image data, and load the image, storing it in the texImageSource attribute.
   * If a BufferView is provided, the image data is loaded from it, otherwise it is loaded from the uri.
   * 
   * Is async as it needs to wait for the image to be loaded by the GLTFLoader.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse(gltfLoader: GltfLoader, data: Gltf2.IImage): Promise<any> {

    if (data.uri) {
      this.uri = data.uri;

      if (this.uri.indexOf('data:') == 0) {
        this.resolvedUri = this.uri;
      } else {
        this.resolvedUri = gltfLoader.resolveUri(this.uri);
      }
    }



    this.mimeType = data.mimeType;

    if (data.bufferView !== undefined) {
      this.bufferView = await gltfLoader.getElement(GltfTypes.BUFFERVIEW, data.bufferView);
    }

    await this.loadImage(gltfLoader);
    
  }

  
  /**
   * Load the image data and stores it in the texImageSource attribute.
   * 
   * Is async as it needs to wait for the image to be loaded by the GLTFLoader.
   * @param gltfLoader GLTFLoader to use for loading
   */
  protected async loadImage(gltfLoader: GltfLoader): Promise<void> {
    const blob = await this.loadImageBlob(gltfLoader.abortSignal);
    this.texImageSource = await gltfLoader.gltfIO.loadImageBlob(blob, gltfLoader.abortSignal);
  }


  /**
   * Load the image data from the uri (external image path or base64-encoded data) or from the provided BufferView,
   * and return it as a Blob.
   * 
   * Is async as it needs to wait for the image to be fetched (in case it don't use a BufferView).
   * @param abortSignal Abort signal for cancellation
   */
  protected async loadImageBlob(abortSignal: AbortSignalLike): Promise<Blob> {

    if (this.bufferView) {
      // mimeType is guaranted here
      const arrayView = new Uint8Array(
        this.bufferView.buffer._bytes,
        this.bufferView.getByteOffset(),
        this.bufferView.byteLength
      );
      return new Blob([arrayView], { type: this.mimeType });
    } else {
      // assume uri is defained as uri or data uri
      const signal = createNativeSignal(abortSignal)
      const request = await fetch(this.resolvedUri, { signal })
      const blob = await request.blob();
      return blob;
    }

  }

  /**
   * Setup the provided Texture2D with the image data, with provided wrap and filter modes, by binding it to the GPU.
   * Called by the Texture element during allocation.
   * 
   * Is async as it can need to wait for the image to be resized to a POT (Power Of Two) texture.
   * @param texture Texture to setup
   * @param wrapS Horizontal texture wrap
   * @param wrapT Vertical texture wrap
   * @param minFilter Minification filter
   * @param magFilter Magnification filter
   */
  public async setupTexture(texture: Texture2D, wrapS : GLenum, wrapT : GLenum, minFilter : GLenum, magFilter: GLenum): Promise<void> {

    const gl = texture.gl;

   let texImageSource = this.texImageSource;
   if( wrapRequirePot(wrapS) || wrapRequirePot( wrapT ) || filterHasMipmap(minFilter) ){
     if( !isPowerOf2(texImageSource.width) || !isPowerOf2(texImageSource.height) )
     texImageSource = await this.resizeToPOT( texImageSource, gl );
    }

    texture.fromImage(this.texImageSource);

    if( filterHasMipmap(minFilter) ){
      gl.generateMipmap( gl.TEXTURE_2D );
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);


  }

  /**
   * Resize the provided image to the nearest Power Of Two size.
   * 
   * Is async as it can need to wait for createImageBitmap.
   * @param source Image to resize
   * @param gl GL context, unused here
   */
  async resizeToPOT( source: TexImageSource, gl : GLContext ) : Promise<TexImageSource> {

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width  = nearestPowerOf2( source.width );
    canvas.height = nearestPowerOf2( source.height );
    
    if( source instanceof ImageData ){
      const imageBitmap = await createImageBitmap( source, 0, 0, canvas.width, canvas.height, {} );
      context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
    } else {
      context.drawImage(source, 0, 0, canvas.width, canvas.height);
    }

    return canvas;

  }

}
