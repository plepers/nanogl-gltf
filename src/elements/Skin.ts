//@flow

import { ElementType } from '../consts';
import BaseElement from './BaseElement';

import Gltf from '../index';
import { Data_Skin } from '../schema/glTF';


export default class Skin extends BaseElement {

  static TYPE = ElementType.SKIN;

  constructor( gltf: Gltf, data: Data_Skin ){

    super( gltf, data );

  }
  

}

