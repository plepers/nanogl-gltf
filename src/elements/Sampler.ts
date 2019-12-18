

import { ElementType } from '../consts';
import { Data_Sampler } from '../schema/glTF';
import Gltf        from '../index'     ;
import BaseElement from './BaseElement';


const GL_REPEAT = 10497;


export default class Sampler extends BaseElement {

  static TYPE = ElementType.SAMPLER;

  magFilter?: GLenum;
  minFilter?: GLenum;
  wrapS     : GLenum;
  wrapT     : GLenum

  parse( gltf: Gltf, data: Data_Sampler ){

    super.parse( gltf, data );

    this.magFilter = data.magFilter
    this.minFilter = data.minFilter
    this.wrapS     = data.wrapS     ?? GL_REPEAT
    this.wrapT     = data.wrapT     ?? GL_REPEAT

  }

}

