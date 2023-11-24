
import base64 from 'base64-js'

import IOInterface from "./IOInterface";

import UTF8   from '../lib/utf8-decoder'
import GltfIO from ".";
import {AbortSignal} from '@azure/abort-controller'
import { cancellablePromise, createNativeSignal } from '../lib/cancellation';


/**
 * we need a createImageBitmap implementation which support options
 * make test with small data uri png
 */
async function checkCreateImageBitmapCapability() : Promise<boolean>{
  if( typeof window === "undefined" || window.createImageBitmap === undefined ){
    return false
  }
  const uri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";
  const request = await fetch( uri )
  const blob = await request.blob();
  try{
    //@ts-ignore
    await window.createImageBitmap( blob, {
      premultiplyAlpha:'none',
      colorSpaceConversion : 'none'
    });
  } catch(e){
    return false;
  }
    
  return true;
}

const CreateImageBitmapAvailable : Promise<boolean> = checkCreateImageBitmapCapability();

function baseDir( p:string ) : string[]{
  const sep = p.lastIndexOf("/");
  return [
    p.substr( 0, sep ),
    p.substr( sep + 1 ),
  ]
}


/**
 * Loader implementation for web usage
 */
export class WebImpl implements IOInterface {

  /**
   * Check if a URI starts with 'data:', meaning it's a base-64 encoded data
   * @param uri URI to check
   */
  isDataURI( uri : string ) : boolean{
    return ( uri.indexOf('data:') === 0 );
  }

  /**
   * Decode a data URI and return the decoded data as an ArrayBuffer, will throw if not a data URI
   * @param uri URI to decode
   */
  decodeDataURI(uri: string): ArrayBuffer {
    if( uri.indexOf('data:') !== 0 ){
      throw new Error('invalid dataURI' )
    }
    const b64 = uri.substr( uri.indexOf(',')+1 );

    return base64.toByteArray( b64 ).buffer;
  }
  
  /**
   * Get the base directory and filename of a file path
   * @param path File path to resolve
   * @returns [baseDir, filename]
   */
  resolveBaseDir( path: string ) : string[]{
    return baseDir( path );
  }

  /**
   * Get the absolute path of a file path relative to a base directory
   * @param path File path to resolve
   * @param baseurl Base directory to resolve from
   */
  resolvePath(path: string, baseurl: string ): string {
    if( baseurl === undefined || this.isDataURI( path ) )
      return path;  
    return baseurl + '/' + path;
  }

  /**
   * Decode an ArrayBuffer encoded as UTF-8
   * @param buffer ArrayBuffer to decode
   * @param offset Offset in the ArrayBuffer to start decoding from
   * @param length Length of the ArrayBuffer to decode
   */
  decodeUTF8(buffer: ArrayBuffer, offset  = 0, length : number = undefined ): string {
    if( length === undefined ) length = buffer.byteLength - offset;
    return UTF8( new Uint8Array( buffer, offset, length ) );
  }
  
  /**
   * Load a resource and return it as a string
   * @param path Path to resource
   * @param abortSignal Abort signal if you want to be able to cancel the request at any time
   */
  async loadResource(path: string, abortSignal : AbortSignal = AbortSignal.none): Promise<string> {
    const signal = createNativeSignal( abortSignal );
    const response = await fetch( path, {signal} );
    return response.text();
  }
  
  /**
   * Load a resource and return it as an ArrayBuffer
   * @param path Path to resource
   * @param abortSignal Abort signal if you want to be able to cancel the request at any time
   */
  async loadBinaryResource(path: string, abortSignal : AbortSignal = AbortSignal.none): Promise<ArrayBuffer> {
    if( this.isDataURI( path ) ){
      return this.decodeDataURI( path );
    }
    const signal = createNativeSignal( abortSignal );
    const response = await fetch( path, {signal} );
    return response.arrayBuffer();
  }
  
  /**
   * Load an image from a Uint8Array
   * @param arrayView Uint8Array containing the image data
   * @param mimetype Image mimetype (image/png, image/webp, ...)
   * @param abortSignal Abort signal if you want to be able to cancel the request at any time
   */
  async loadImageBuffer(arrayView:Uint8Array, mimetype : string, abortSignal : AbortSignal = AbortSignal.none ) : Promise<TexImageSource> {
    const blob = new Blob( [arrayView] , { type: mimetype });
    return this.loadImageBlob( blob, abortSignal );
  }

  /**
   * Load an image from a URI
   * @param uri Image URI
   * @param abortSignal Abort signal if you want to be able to cancel the request at any time
   */
  async loadImage(uri:string, abortSignal : AbortSignal = AbortSignal.none) : Promise<TexImageSource> {
    const signal = createNativeSignal( abortSignal );
    const request = await fetch( uri,  {signal} )
    const blob = await request.blob();
    return this.loadImageBlob( blob, abortSignal );
  }

  /**
   * Load a Blob as an image ready to be used as a texture
   * @param blob Blob to load
   * @param abortSignal Abort signal if you want to be able to cancel the request at any time
   */
  async loadImageBlob( blob : Blob, abortSignal : AbortSignal ) : Promise<TexImageSource> {
    let promise : Promise<TexImageSource>;
    const hasCIB : boolean = await CreateImageBitmapAvailable;

    if( hasCIB )
    {
      //@ts-ignore
      promise = createImageBitmap( blob, {
        premultiplyAlpha:'none',
        colorSpaceConversion : 'none'
      });
    } 
    else {
      
      const img = new window.Image();
      const src = URL.createObjectURL(blob);

      const loadPromise = new Promise( (resolve, reject)=>{
        img.onload  = resolve;
        img.onerror = reject;
        img.src = src;
      }).finally( ()=>URL.revokeObjectURL(src) )

      promise = loadPromise.then( ()=>img );

    }

    return cancellablePromise( promise, abortSignal );
  }

  /**
   * @hidden
   */
  writeResource(path: string, data: string) : Promise<boolean>{
    throw new Error("Method not implemented.");
  }
  
  /**
   * @hidden
   */
  writeBinaryResource(path: string, data: ArrayBuffer) : Promise<boolean>{
    throw new Error("Method not implemented.");
  }

}


export const IO = new WebImpl();
const _instance :  GltfIO = new  GltfIO( IO );

export default _instance;
