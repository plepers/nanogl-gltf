import { IExtensionFactory } from "../extensions/IExtension"
import { AbortSignal } from "@azure/abort-controller"



type Options = {

  baseurl : string
  /**
   * per loader additional extensions
   * Extensions are merged with global extensions
   */
  extensions : IExtensionFactory[]

  abortSignal : AbortSignal

  /**
   * texture's minFilter to use when sampler dosn't specify one
   * default to gl.LINEAR
   */
  defaultTextureFilter : GLenum
  
}

export type GltfLoaderOptions = Partial<Options>