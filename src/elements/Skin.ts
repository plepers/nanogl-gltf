

import { ElementType } from '../consts';
import { Data_Skin } from '../schema/glTF';
import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Accessor    from './Accessor'   ;
import Node        from './Node'       ;
import { mat4 } from 'gl-matrix';


export default class Skin extends BaseElement {

  static TYPE = ElementType.SKIN;

  inverseBindMatrices: mat4[];
  skeletonRoot : Node;
  joints       : Node[];

  parse( gltf: Gltf, data: Data_Skin ){

    super.parse( gltf, data );
    
    this.joints = data.joints.map( idx=>this.gltf.getElement( ElementType.NODE, idx ) )

    this.inverseBindMatrices = this.joints.map( mat4.create );

    if( data.inverseBindMatrices !== undefined ){
      const ibmAccessor = this.gltf.getElement<Accessor>( ElementType.ACCESSOR, data.inverseBindMatrices );
      this.inverseBindMatrices.forEach( (m, i)=>ibmAccessor.getValue(m, i) )
    }

    if( data.skeleton !== undefined ){
      this.skeletonRoot = this.gltf.getElement( ElementType.NODE, data.skeleton );
    }

  }

}

