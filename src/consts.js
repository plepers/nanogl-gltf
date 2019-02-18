//@ts-check

export const TYPE_BUFFER              = 'buffers';
export const TYPE_BUFFERVIEW          = 'bufferViews';
export const TYPE_ACCESSOR            = 'accessors';
export const TYPE_ANIMATION           = 'animations';
export const TYPE_MESH                = 'meshes';
export const TYPE_PRIMITIVE           = 'primitives';
export const TYPE_NODE                = 'nodes';
export const TYPE_MATERIAL            = 'materials';

export const TYPE_ANIMATION_SAMPLER   = 'animationSamplers';
export const TYPE_ANIMATION_CHANNEL   = 'animationChannels';

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
