

export const TYPE_BUFFER              = 'buffers';
export const TYPE_BUFFERVIEW          = 'bufferViews';
export const TYPE_ACCESSOR            = 'accessors';
export const TYPE_ANIMATION           = 'animations';
export const TYPE_NODE                = 'nodes';

export const TYPE_ANIMATION_SAMPLER   = 'samplers';
export const TYPE_ANIMATION_CHANNEL   = 'channels';

export const ROOT_TYPES = [
  TYPE_BUFFERVIEW,
  TYPE_ACCESSOR,
  TYPE_ANIMATION,
]

export const ALL_TYPES = [
  ...ROOT_TYPES,
  TYPE_BUFFER,
  TYPE_ANIMATION_SAMPLER,
  TYPE_ANIMATION_CHANNEL,
]
