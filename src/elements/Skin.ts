


import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Accessor    from './Accessor'   ;
import Node        from './Node'       ;
import { mat4 } from 'gl-matrix';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


export default class Skin extends BaseElement {

  readonly gltftype : GltfTypes.SKIN = GltfTypes.SKIN;

  inverseBindMatrices: mat4[];
  skeletonRoot : Node;
  joints       : Node[];

  parse( gltfLoader:GltfLoader, data: Gltf2.ISkin ){

    super.parse( gltfLoader, data );
    
    this.joints = data.joints.map( idx=>this.gltf.getElement( GltfTypes.NODE, idx ) )

    this.inverseBindMatrices = this.joints.map( mat4.create );

    if( data.inverseBindMatrices !== undefined ){
      const ibmAccessor = this.gltf.getElement<Accessor>( GltfTypes.ACCESSOR, data.inverseBindMatrices );
      this.inverseBindMatrices.forEach( (m, i)=>ibmAccessor.getValue(m, i) )
    }

    if( data.skeleton !== undefined ){
      this.skeletonRoot = this.gltf.getElement( GltfTypes.NODE, data.skeleton );
    }

  }

}

