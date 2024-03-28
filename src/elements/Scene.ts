
import Node        from './Node'       ;
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';


/**
 * The Scene element is the root of the scene graph, it contains all the root nodes of the scene, which in turn contains all the children nodes and cover the whole scene to render.
 */
export default class Scene implements IElement {

  readonly gltftype : GltfTypes.SCENE = GltfTypes.SCENE;
  name        : undefined | string;
  extras      : any   ;

  /**
   * Node element of each root nodes in the scene
   */
  nodes : Node[]


  /**
   * Parse the Scene data, fill the nodes array with the Nodes elements created by the GLTFLoader.
   * 
   * Is async as it needs to wait for all the Nodes to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse( gltfLoader:GltfLoader, data: Gltf2.IScene ){

    if( data.nodes !== undefined ){
      const nodePromises = data.nodes.map( idx=>gltfLoader.getElement( GltfTypes.NODE, idx ) )
      this.nodes = await Promise.all( nodePromises );
    } else {
      this.nodes = [];
    }

  }

  /*
   * Update world matrices of all scene nodes
   */
  updateNodes(){
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].updateWorldMatrix();
    }
  }

}
