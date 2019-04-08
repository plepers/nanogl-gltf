
//@flow

import { ElementType } from '../consts';
import BaseElement from './BaseElement';

import Gltf from '../index';


export default class Camera extends BaseElement {

  static TYPE : ElementType = ElementType.CAMERA;

  constructor( gltf: Gltf, data: any ){

    super( gltf, data );

  }
  

}

