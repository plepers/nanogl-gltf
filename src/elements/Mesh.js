//@flow

import { TYPE_MESH } from '../consts';
import BaseElement from './BaseElement';
import Primitive from './Primitive';


import type Gltf from '../index';

export default class Mesh extends BaseElement {

  static TYPE = TYPE_MESH;

  primitives : Primitive[];
  weights    : number[];

  constructor( gltf: Gltf, data: any ){

    super( gltf, data );

    

    this.primitives = data.primitives.map(
      d => new Primitive(gltf, d)
    );
    
    this.gltf.addElements(this.primitives);


    this.weights = data.weights;

  }
  

}

