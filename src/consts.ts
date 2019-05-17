


export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array
export type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Uint8ClampedArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor

const TYPES = {
}




export const MAGIC      = 0x46546C67; // "glTF"
export const JSON_MAGIC = 0x4E4F534A; // "JSON"
export const GLB_HEADER_SIZE = 20;


export enum PrimitiveMode {
  POINTS          = 0,
  LINES           = 1,
  LINE_LOOP       = 2,
  LINE_STRIP      = 3,
  TRIANGLES       = 4,
  TRIANGLE_STRIP  = 5,
  TRIANGLE_FAN    = 6,

  DEFAULT         = 4,
}


export enum ElementType {

  NONE              = ''          ,
  BUFFER            = 'buffers'          ,
  BUFFERVIEW        = 'bufferViews'      ,
  ACCESSOR          = 'accessors'        ,
  ANIMATION         = 'animations'       ,
  MESH              = 'meshes'           ,
  PRIMITIVE         = 'primitives'       ,
  NODE              = 'nodes'            ,
  SCENE             = 'scenes'           ,
  CAMERA            = 'cameras'          ,
  SKIN              = 'skins'            ,
  IMAGE             = 'images'           ,
  SAMPLER           = 'samplers'         ,
  TEXTURE           = 'textures'         ,
  MATERIAL          = 'materials'        ,
  ANIMATION_SAMPLER = 'animationSamplers',
  ANIMATION_CHANNEL = 'animationChannels',

};





export const ROOT_TYPES = [
  ElementType.BUFFERVIEW,
  ElementType.ACCESSOR,
  ElementType.ANIMATION,
  ElementType.MESH,
]

export const ALL_TYPES = [
  ...ROOT_TYPES,
  ElementType.BUFFER,
  ElementType.ANIMATION_SAMPLER,
  ElementType.ANIMATION_CHANNEL,
  ElementType.PRIMITIVE,
]
