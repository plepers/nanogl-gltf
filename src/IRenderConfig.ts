
/**
 * Interface for render config, defining opaque and blended masks.
 * Useful to extends if need to add custom masks.
 */
export default interface IRenderConfig {
  opaqueMask : number
  blendedMask : number
}

/**
 * Default render config defining opaque mask as 1 and blended mask as 2
 */
export function DefaultRenderConfig(){
  return {
    opaqueMask : 1<<0,
    blendedMask : 1<<1,
  }
}
