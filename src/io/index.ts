import Gltf from "../Gltf";
import IOInterface from "./IOInterface";
import GltfLoader from "./GltfLoader";
import { GltfLoaderOptions } from "./GltfLoaderOptions";


/**
 * This class provides functionalities for loading gltf files and serves as a wrapper for IOInterface
 */
export default class GltfIO {
  
  /**
   * IOInterface implementation
   */
  _ioImpl: IOInterface;

  /**
   * @param io IOInterface implementation
   */
  constructor( io : IOInterface ){
    this._ioImpl = io;
  }

  /**
   * Load a Gltf file
   * @param path Gltf file path
   * @param options Options for the loader
   */
  loadGltf(path: string, options : GltfLoaderOptions = {} ): Promise<Gltf> {
    const loader = new GltfLoader( this._ioImpl, path, options );
    return loader.load();
  }

}




