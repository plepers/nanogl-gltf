


import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Node        from './Node'       ;
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


export default class Scene extends BaseElement {

  readonly gltftype : GltfTypes.SCENE = GltfTypes.SCENE;

  nodes : Node[]

  parse( gltfLoader:GltfLoader, data: Gltf2.IScene ){

    super.parse( gltfLoader, data );

    if( data.nodes !== undefined ){
      this.nodes = data.nodes.map( idx=>this.gltf.getElement( GltfTypes.NODE, idx ) )
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

