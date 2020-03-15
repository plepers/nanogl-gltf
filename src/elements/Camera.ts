
import { mat4 } from 'gl-matrix';


import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';


type ProjectionData = Gltf2.ICameraPerspective | Gltf2.ICameraOrthographic;



export default class Camera implements IElement {

  
  readonly gltftype : GltfTypes.CAMERA = GltfTypes.CAMERA;

  name        : undefined | string;
  extras      : any   ;
  
  type : Gltf2.CameraType;
  projectionData : ProjectionData;
  projection : mat4;

  parse( gltfLoader:GltfLoader, data: Gltf2.ICamera ) : Promise<any>{

    this.projection = mat4.create();

    this.type = data.type;
  

    switch( this.type ){
      
      case Gltf2.CameraType.PERSPECTIVE:
        this.projectionData = data.perspective;
        this.createPerpective( this.projectionData );
        break;
      
      case Gltf2.CameraType.ORTHOGRAPHIC:
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




















