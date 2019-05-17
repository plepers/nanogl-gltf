//@flow

import { ElementType } from '../consts';
import BaseElement from './BaseElement';


import Gltf from '../index';
import { Data_Material } from '../schema/glTF';


export default class Material extends BaseElement {

  static TYPE : ElementType = ElementType.MATERIAL;

  constructor( gltf: Gltf, data: Data_Material ){

    super( gltf, data );

  }
  

}

