import { GLContext } from "nanogl/types"

/**
 * List of supported formats by a Basis decoder, given a .ktx2 file
 */
export type SupportedFormats = {
  s3tc :boolean
  etc1 :boolean
  etc2 :boolean
  pvrtc:boolean
  astc :boolean
  bptc :boolean
}



export type DecodingResponseFormat = { 
  format: number
  uncompressed?: boolean
  type?: number 
}

export type DecodingResponseLevel = {
  level : number
  offset: number
  size  : number
  width : number
  height: number
}


/**
 * Response from a BasisDecoder request that succeed
 */
export type DecodingResponse = {

  /**
   * Request id
   */
  id: number,

  /**
   * ArrayBuffer containing the decoded basis file
   */
  buffer: ArrayBuffer,

  /**
   * ArrayBuffer containing the alpha data, if any
   */
  alphaBuffer: ArrayBuffer | null,

  /**
   * WebGL format of the decoded image
   */
  webglFormat: DecodingResponseFormat,

  /**
   * Array of mip levels needed for this image
   */
  mipLevels: DecodingResponseLevel[],

  /**
   * True if the basis file has alpha data
   */
  hasAlpha: boolean,

}


/**
 * Response from a BasisDecoder request that failed
 */
export type DecodingError = {

  /**
   * Request id
   */
  id: number

  /**
   * Error message
   */
  error: string

}


/**
 * Response from a BasisDecoder request, either a DecodingResponse in case of succeed or a DecodingError in case of failure
 */
export type WorkerResponse = DecodingResponse | DecodingError


/**
 * Interface for a decoder that can be used to decode a basis file (for .ktx2 files)
 */
export interface IBasisDecoder {

  /**
   * Decode a basis file
   * @param gl GL context
   * @param buffer ArrayBuffer containing the basis file
   */
  decode(gl : GLContext, buffer: ArrayBuffer) : Promise<DecodingResponse>

}