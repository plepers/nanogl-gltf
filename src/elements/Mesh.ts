//@flow

import { ElementType } from '../consts';
import BaseElement from './BaseElement';
import Primitive from './Primitive';


import Gltf from '../index';

export default class Mesh extends BaseElement {

  static TYPE : ElementType = ElementType.MESH;

  primitives : Primitive[];
  weights    : Float32Array;

  constructor( gltf: Gltf, data: any ){

    super( gltf, data );

    this.primitives = data.primitives.map(
      d => new Primitive(gltf, d)
    );
    
    this.gltf.addElements(this.primitives);

    if( data.weights )
      this.weights = new Float32Array( data.weights );

  }

  

}

