
import { mat4 } from 'gl-matrix';


import BaseElement from './BaseElement';

import Gltf from '../index';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


type ProjectionType = "perspective" | "orthographic" | string;
type ProjectionData = Gltf2.ICameraPerspective | Gltf2.ICameraOrthographic;


export const PROJ_PERSPECTIVE      : ProjectionType = 'perspective';
export const PROJ_ORTHOGRAPHIC     : ProjectionType = 'orthographic';




export default class Camera extends BaseElement {

  
  readonly gltftype : GltfTypes.CAMERA = GltfTypes.CAMERA;

  type : ProjectionType;
  projectionData : ProjectionData;
  projection : mat4;

  parse( gltfLoader:GltfLoader, data: Gltf2.ICamera ) : Promise<any>{

    super.parse( gltfLoader, data );

    this.projection = mat4.create();

    this.type = data.type;
  

    switch( this.type ){
      
      case PROJ_PERSPECTIVE:
        this.projectionData = data.perspective;
        this.createPerpective( this.projectionData );
        break;
      
      case PROJ_ORTHOGRAPHIC:
        this.projectionData = data.orthographic;
        this.createOrtho( this.projectionData );
        break;

      default:
        throw new Error('Camera - unsupported type '+this.type );
        
    }

    return Promise.resolve();


  }

  createPerpective( data : Gltf2.ICameraPerspective ){

    mat4.perspective( this.projection,
      data.yfov,
      data.aspectRatio,
      data.znear,
      data.zfar
    );

  }

  createOrtho( data : Gltf2.ICameraOrthographic ){

    mat4.ortho( this.projection,
      -data.xmag *.5,
      data.xmag *.5,
      -data.ymag * .5,
      data.ymag * .5,
      data.znear,
      data.zfar
    );

  }
  

}




















