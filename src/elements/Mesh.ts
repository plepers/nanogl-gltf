


import BaseElement from './BaseElement';
import Primitive from './Primitive';


import Gltf from '../index';
import { GLContext } from 'nanogl/types';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';

export default class Mesh extends BaseElement {
  
  static TYPE : GltfTypes = GltfTypes.MESH;
  
  primitives : Primitive[];
  weights    : Float32Array;
  
  parse( gltfLoader:GltfLoader, data: Gltf2.IMesh ){
    
    super.parse( gltfLoader, data );
    
    this.primitives = data.primitives.map(
      d => {
        const p = new Primitive();
        p.parse(gltfLoader, d);
        return p;
      }
    );
    
    this.gltf.addElements(this.primitives);
    
    if( data.weights )
    this.weights = new Float32Array( data.weights );
    
  }
    
    
    
  allocateGl( gl : GLContext ) {
    for( const primitive of this.primitives ) {
      primitive.allocateGl( gl );
    }
  }

  

}

