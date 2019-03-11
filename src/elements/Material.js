//@flow

import { TYPE_MATERIAL } from '../consts';
import BaseElement from './BaseElement';


import type Gltf from '../index';
import type { ElementType } from '../consts';


export default class Material extends BaseElement {

  static TYPE : ElementType = TYPE_MATERIAL;

  constructor( gltf: Gltf, data: any ){

    super( gltf, data );

  }
  

}

