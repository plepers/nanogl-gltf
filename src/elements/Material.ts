//@flow

import { ElementType } from '../consts';
import BaseElement from './BaseElement';


import Gltf from '../index';


export default class Material extends BaseElement {

  static TYPE : ElementType = ElementType.MATERIAL;

  constructor( gltf: Gltf, data: any ){

    super( gltf, data );

  }
  

}

