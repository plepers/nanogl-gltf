


import Node        from './Node'       ;
import { mat4 } from 'gl-matrix';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';


export default class Skin implements IElement {

  readonly gltftype : GltfTypes.SKIN = GltfTypes.SKIN;

  name        : undefined | string;
  extras      : any   ;
  
  inverseBindMatrices: mat4[];
  skeletonRoot : Node;
  joints       : Node[];

  async parse( gltfLoader:GltfLoader, data: Gltf2.ISkin ){

    const jointPromises = data.joints.map( idx=>gltfLoader.getElement( GltfTypes.NODE, idx ) )
    this.joints = await Promise.all( jointPromises );

    this.inverseBindMatrices = this.joints.map( mat4.create );

    if( data.inverseBindMatrices !== undefined ){
      const ibmAccessor = await gltfLoader.getElement( GltfTypes.ACCESSOR, data.inverseBindMatrices );
      this.inverseBindMatrices.forEach( (m, i)=>ibmAccessor.getValue(m, i) )
    }

    if( data.skeleton !== undefined ){
      this.skeletonRoot = await gltfLoader.getElement( GltfTypes.NODE, data.skeleton );
    }

  }

}

