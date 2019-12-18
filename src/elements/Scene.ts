

import { ElementType } from '../consts';
import { Data_Scene } from '../schema/glTF';
import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Node        from './Node'       ;


export default class Scene extends BaseElement {

  static TYPE = ElementType.SCENE;

  nodes : Node[]

  parse( gltf: Gltf, data: Data_Scene ){

    super.parse( gltf, data );

    if( data.nodes !== undefined ){
      this.nodes = data.nodes.map( idx=>gltf.getElement( ElementType.NODE, idx ) )
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

