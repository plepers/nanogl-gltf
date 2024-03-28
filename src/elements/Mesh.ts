
import Primitive from './Primitive';

import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';


/**
 * The Mesh element represents an object to render, containing an array of Primitive elements,
 * each one is a geometry to render with a given material.
 */
export default class Mesh implements IElement {

  readonly gltftype : GltfTypes.MESH = GltfTypes.MESH;
  name        : undefined | string;
  extras      : any   ;

  /**
   * Array of Primitive elements, each one is a geometry to render
   */
  primitives : Primitive[];

  /**
   * Array of weights for morph targets, if this mesh has morph targets
   */
  weights?   : Float32Array;
  

  /**
   * Parse the Mesh data, fill the primitives array with the Primitives elements created by the GLTFLoader, and the weights array if this Mesh has morph targets.
   * 
   * Is async as it needs to wait for all the Primitives to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse( gltfLoader:GltfLoader, data: Gltf2.IMesh ) : Promise<any>{
    
    const primPromises = data.primitives.map( (data)=>gltfLoader._loadElement(data) );
    this.primitives = await Promise.all( primPromises );
    
    if( data.weights ){
      this.weights = new Float32Array( data.weights );
    }
    
  }

}
