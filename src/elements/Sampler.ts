


import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';


const GL_REPEAT = 10497;


/**
 * The Sampler element contains the texture filtering and wrapping properties, determining how a texture should be sampled.
 */
export default class Sampler implements IElement {

  readonly gltftype : GltfTypes.SAMPLER = GltfTypes.SAMPLER;
  name        : undefined | string;
  extras      : any   ;
  

  /**
   * Texture magnification filter, how to interpolate texels when magnifying the texture (when zooming in)
   */
  magFilter?: GLenum;

  /**
   * Texture minification filter, how to interpolate texels when minifying the texture (when zooming out)
   */
  minFilter?: GLenum;

  /**
   * Texture wrapping function for S coordinates (U in UV mapping, X in XY plane). Default to GL_REPEAT
   */
  wrapS     : GLenum;

  /**
   * Texture wrapping function for T coordinates (V in UV mapping, Y in XY plane). Default to GL_REPEAT
   */
  wrapT     : GLenum


  /**
   * Parse the Sampler data, fill the magFilter, minFilter, wrapS and wrapT properties.
   * @param gltfLoader GLTFLoader to use, unused here
   * @param data Data to parse
   */
  parse( gltfLoader:GltfLoader, data: Gltf2.ISampler ): Promise<any>{

    this.magFilter = data.magFilter
    this.minFilter = data.minFilter
    this.wrapS     = data.wrapS     ?? GL_REPEAT
    this.wrapT     = data.wrapT     ?? GL_REPEAT

    return Promise.resolve()

  }

}
