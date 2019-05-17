
import { mat4 } from 'gl-matrix';

import { ElementType } from '../consts';
import BaseElement from './BaseElement';

import Gltf from '../index';
import { Data_Camera, Data_CameraPerspective, Data_CameraOrthographic } from '../schema/glTF';


type ProjectionType = "perspective" | "orthographic" | string;
type ProjectionData = Data_CameraPerspective | Data_CameraOrthographic;


export const PROJ_PERSPECTIVE      : ProjectionType = 'perspective';
export const PROJ_ORTHOGRAPHIC     : ProjectionType = 'orthographic';




export default class Camera extends BaseElement {

  static TYPE : ElementType = ElementType.CAMERA;

  type : ProjectionType;
  projectionData : ProjectionData;
  projection : Float32Array;

  constructor( gltf: Gltf, data: Data_Camera ){

    super( gltf, data );

    this.projection = new Float32Array( 16 );

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


  }

  createPerpective( data : Data_CameraPerspective ){

    mat4.perspective( this.projection,
      data.yfov,
      data.aspect,
      data.znear,
      data.zfar
    );

  }

  createOrtho( data : Data_CameraOrthographic ){

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




















