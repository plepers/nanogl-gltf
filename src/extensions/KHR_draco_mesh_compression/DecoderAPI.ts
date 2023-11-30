
/**
 * Data for the indices of a Draco geometry
 */
export interface IndicesData {

  /**
   * The buffer containing the indices
   */
  buffer : ArrayBuffer

  /**
   * Type of each index (gl.UNSIGNED_SHORT, gl.UNSIGNED_INT, ...)
   */
  gltype : number

}


/**
 * Data for an attribute of a Draco geometry
 */
export interface IAttribute {

  /**
   * The buffer containing the attribute data
   */
  buffer : ArrayBuffer
  
  /**
   * Attribute semantic (POSITION, NORMAL, TEXCOORD_0, ...)
   */
  semantic      : string

  /**
   * Type of each value in this buffer (5120 for BYTE, 5126 for FLOAT, ...)
   */
  componentType : number

  /**
   * Number of components for this accessor type (1 for scalar, 3 for vec3, 16 for mat4, ...)
   */
  numComps      : number

  /**
   * Whether the attribute is normalized or not
   */
  normalized    : boolean

  /**
   * Offset in bytes from the beginning of the buffer
   */
  byteOffset    : number

  /**
   * Stride in bytes between values, if different values are interleaved in this buffer
   */
  _stride       : number

}


/**
 * Geometry decoded from Draco
 */
export interface IDracoGeometry {

  /**
   * The attributes of the geometry
   */
  attributes : IAttribute[]

  /**
   * The indices of the geometry
   */
  indices : IndicesData

  /**
   * The number of indices
   */
  numIndices : number

  /**
   * The number of vertices
   */
  numVertices : number
  
}


export type Semantic = string


/**
 * Request to Draco decoder
 */
export interface IDracoRequest {

  /**
   * Whole buffer containing the encoded geometry
   */
  buffer : ArrayBuffer

  /**
   * The attributes to decode and their index in the encoded buffer
   */
  attributes? : Record<Semantic,number>

}

/**
 * Response from Draco decoder
 */
export interface IDracoResponse {

  /**
   * Error message if the request failed
   */
  error? : string

  /**
   * The decoded geometry if the request succeeded
   */
  geometry : IDracoGeometry

}
