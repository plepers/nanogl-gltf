


import BaseElement from './BaseElement';
import Primitive from './Primitive';


import Gltf from '../index';
import { GLContext } from 'nanogl/types';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';

export default class Mesh extends BaseElement {
  
  readonly gltftype : GltfTypes.MESH = GltfTypes.MESH;
  
  primitives : Primitive[];
  weights?   : Float32Array;
  
  async parse( gltfLoader:GltfLoader, data: Gltf2.IMesh ) : Promise<any>{
    
    super.parse( gltfLoader, data );
    


    const channelPromises = data.primitives.map( (data)=>gltfLoader._loadElement(data) );
    this.primitives = await Promise.all( channelPromises );
    
    if( data.weights ){
      this.weights = new Float32Array( data.weights );
    }
    
  }
    
    
    
  allocateGl( gl : GLContext ) {
    for( const primitive of this.primitives ) {
      primitive.allocateGl( gl );
    }
  }

  

}

