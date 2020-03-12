
import BaseElement from './BaseElement';
import Node        from './Node'       ;
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


export default class Scene extends BaseElement {

  readonly gltftype : GltfTypes.SCENE = GltfTypes.SCENE;

  nodes : Node[]

  async parse( gltfLoader:GltfLoader, data: Gltf2.IScene ){

    super.parse( gltfLoader, data );

    if( data.nodes !== undefined ){
      const nodePromises = data.nodes.map( idx=>gltfLoader.getElement( GltfTypes.NODE, idx ) )
      this.nodes = await Promise.all( nodePromises );
    } else {
      this.nodes = [];
    }

  }

  /*
   * update world matrices of all scene nodes
   */
  updateNodes(){
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].updateWorldMatrix();
    }
  }




}

