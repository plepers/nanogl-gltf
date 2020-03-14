import { IExtensionFactory } from "../extensions/IExtension"



type Options = {

  baseurl : string;
  /**
   * per loader additional extensions
   * Extensions are merged with global extensions
   */
  extensions : IExtensionFactory[];
  
}

export type GltfLoaderOptions = Partial<Options>