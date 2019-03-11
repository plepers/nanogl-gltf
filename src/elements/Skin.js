//@flow

import { TYPE_SKIN } from '../consts';
import BaseElement from './BaseElement';

import type Gltf from '../index';


export default class Skin extends BaseElement {

  static TYPE = TYPE_SKIN;

  constructor( gltf: Gltf, data: any ){

    super( gltf, data );

  }
  

}

