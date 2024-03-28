import { IExtensionFactory } from "../extensions/IExtension"
import { AbortSignal } from "@azure/abort-controller"


/**
 * All options available for GltfLoader
 */
export type Options = {

  /**
   * Custom base url to use for file paths
   */
  baseurl : string

  /**
   * Additional extensions specific to this loader.
   * Extensions are merged with global extensions
   */
  extensions : IExtensionFactory[]

  /**
   * Abort signal if you want to be able to cancel the request at any time
   */
  abortSignal : AbortSignal

  /**
   * Texture's minFilter to use when sampler doesn't specify one
   * @default GL_LINEAR
   */
  defaultTextureFilter : GLenum
  
}


/**
 * Options for GltfLoader
 */
export type GltfLoaderOptions = Partial<Options>