//@flow

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array

const TYPES = {
  TYPE_BUFFER            : 'buffers'          ,
  TYPE_BUFFERVIEW        : 'bufferViews'      ,
  TYPE_ACCESSOR          : 'accessors'        ,
  TYPE_ANIMATION         : 'animations'       ,
  TYPE_MESH              : 'meshes'           ,
  TYPE_PRIMITIVE         : 'primitives'       ,
  TYPE_NODE              : 'nodes'            ,
  TYPE_SCENE             : 'scenes'           ,
  TYPE_CAMERA            : 'cameras'          ,
  TYPE_SKIN              : 'skins'            ,
  TYPE_IMAGE             : 'images'           ,
  TYPE_SAMPLER           : 'samplers'         ,
  TYPE_TEXTURE           : 'textures'         ,
  TYPE_MATERIAL          : 'materials'        ,
  TYPE_ANIMATION_SAMPLER : 'animationSamplers',
  TYPE_ANIMATION_CHANNEL : 'animationChannels',
}


export type ElementType = $Values<typeof TYPES>;


export const TYPE_BUFFER            : ElementType = TYPES.TYPE_BUFFER           ;
export const TYPE_BUFFERVIEW        : ElementType = TYPES.TYPE_BUFFERVIEW       ;
export const TYPE_ACCESSOR          : ElementType = TYPES.TYPE_ACCESSOR         ;
export const TYPE_ANIMATION         : ElementType = TYPES.TYPE_ANIMATION        ;
export const TYPE_MESH              : ElementType = TYPES.TYPE_MESH             ;
export const TYPE_PRIMITIVE         : ElementType = TYPES.TYPE_PRIMITIVE        ;
export const TYPE_NODE              : ElementType = TYPES.TYPE_NODE             ;
export const TYPE_SCENE             : ElementType = TYPES.TYPE_SCENE            ;
export const TYPE_CAMERA            : ElementType = TYPES.TYPE_CAMERA           ;
export const TYPE_SKIN              : ElementType = TYPES.TYPE_SKIN             ;
export const TYPE_IMAGE             : ElementType = TYPES.TYPE_IMAGE            ;
export const TYPE_SAMPLER           : ElementType = TYPES.TYPE_SAMPLER          ;
export const TYPE_TEXTURE           : ElementType = TYPES.TYPE_TEXTURE          ;
export const TYPE_MATERIAL          : ElementType = TYPES.TYPE_MATERIAL         ;
export const TYPE_ANIMATION_SAMPLER : ElementType = TYPES.TYPE_ANIMATION_SAMPLER;
export const TYPE_ANIMATION_CHANNEL : ElementType = TYPES.TYPE_ANIMATION_CHANNEL;



export const ROOT_TYPES = [
  TYPE_BUFFERVIEW,
  TYPE_ACCESSOR,
  TYPE_ANIMATION,
  TYPE_MESH,
]

export const ALL_TYPES = [
  ...ROOT_TYPES,
  TYPE_BUFFER,
  TYPE_ANIMATION_SAMPLER,
  TYPE_ANIMATION_CHANNEL,
  TYPE_PRIMITIVE,
]
