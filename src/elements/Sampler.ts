


import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


const GL_REPEAT = 10497;


export default class Sampler extends BaseElement {

  readonly gltftype : GltfTypes.SAMPLER = GltfTypes.SAMPLER;

  magFilter?: GLenum;
  minFilter?: GLenum;
  wrapS     : GLenum;
  wrapT     : GLenum

  parse( gltfLoader:GltfLoader, data: Gltf2.ISampler ): Promise<any>{

    super.parse( gltfLoader, data );

    this.magFilter = data.magFilter
    this.minFilter = data.minFilter
    this.wrapS     = data.wrapS     ?? GL_REPEAT
    this.wrapT     = data.wrapT     ?? GL_REPEAT

    return Promise.resolve()

  }

}

