

import { ElementType } from '../consts';
import BaseElement from './BaseElement';
import Primitive from './Primitive';


import Gltf from '../index';
import { Data_Mesh } from '../schema/glTF';

export default class Mesh extends BaseElement {

  static TYPE : ElementType = ElementType.MESH;

  primitives : Primitive[];
  weights    : Float32Array;

  parse( gltf: Gltf, data: Data_Mesh ){

    super.parse( gltf, data );

    this.primitives = data.primitives.map(
      d => {
        const p = new Primitive();
        p.parse(gltf, d);
        return p;
      }
    );
    
    this.gltf.addElements(this.primitives);

    if( data.weights )
      this.weights = new Float32Array( data.weights );

  }

  

}

