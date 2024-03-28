import { AbortSignal } from "@azure/abort-controller"


/**
 * Loader interface providing methods to resolve and load resources of many types
 */
export default interface IOInterface {

  /**
   * Get the base directory and filename of a file path
   * @param path File path to resolve
   */
  resolveBaseDir( path: string ) : string[]

  /**
   * Resolve an absolute file path relative to a base directory
   * @param path File path to resolve
   * @param base Base directory to resolve from
   */
  resolvePath( path: string, base : string ) : string
  
  /**
   * Load a resource and return it as a string
   * @param path Path to resource
   * @param abortSignal Abort signal if you want to be able to cancel the request at any time
   */
  loadResource(path: string, abortSignal : AbortSignal ): Promise<string>

  /**
   * Load a resource and return it as an ArrayBuffer
   * @param path Path to resource
   * @param abortSignal Abort signal if you want to be able to cancel the request at any time
   */
  loadBinaryResource(path: string, abortSignal : AbortSignal ): Promise<ArrayBuffer>

  // loadImageBuffer(arrayView:Uint8Array, mimetype : string, abortSignal : AbortSignal) : Promise<TexImageSource>;
  // loadImage(uri:string, abortSignal : AbortSignal) : Promise<TexImageSource>;

  /**
   * Load a Blob as an image ready to be used as a texture
   * @param blob Blob to load
   * @param abortSignal Abort signal if you want to be able to cancel the request at any time
   */
  loadImageBlob( blob : Blob, abortSignal : AbortSignal ) : Promise<TexImageSource>

  /**
   * @hidden
   */
  writeResource(path: string, data: string): Promise<boolean>

  /**
   * @hidden
   */
  writeBinaryResource(path: string, data: ArrayBuffer): Promise<boolean>
  
  /**
   * Decode an ArrayBuffer encoded as UTF-8
   * @param buffer ArrayBuffer to decode
   * @param offset Offset in the ArrayBuffer to start decoding from
   * @param length Length of the ArrayBuffer to decode
   */
  decodeUTF8( buffer : ArrayBuffer, offset? : number, length? : number ) : string

  // decodeDataURI( uri : string ) : ArrayBuffer;
  // isDataURI( uri : string ) : Boolean;
  
}
