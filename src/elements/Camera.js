
//@flow

import { TYPE_CAMERA } from '../consts';
import BaseElement from './BaseElement';

import type Gltf from '../index';


export default class Camera extends BaseElement {

  static TYPE = TYPE_CAMERA;

  constructor( gltf: Gltf, data: any ){

    super( gltf, data );

  }
  

}

