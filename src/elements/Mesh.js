//@ts-check

import { TYPE_MESH } from '../consts';
import BaseElement from './BaseElement';
import Primitive from './Primitive';

export default class Mesh extends BaseElement {

  static TYPE = TYPE_MESH;

  constructor( gltf, data ){

    super( gltf, data );

    

    this.primitives = data.primitives.map(
      d => new Primitive(gltf, d)
    );
    
    this.gltf.addElements(this.primitives);


    this.weights = data.weights;

  }
  

}

