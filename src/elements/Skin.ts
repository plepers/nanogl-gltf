//@flow

import { ElementType } from '../consts';
import BaseElement from './BaseElement';

import Gltf from '../index';


export default class Skin extends BaseElement {

  static TYPE = ElementType.SKIN;

  constructor( gltf: Gltf, data: any ){

    super( gltf, data );

  }
  

}

