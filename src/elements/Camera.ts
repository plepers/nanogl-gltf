
import { mat4 } from 'gl-matrix';


import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';
import { ICameraLens } from 'nanogl-camera/ICameraLens';
import PerspectiveLens from 'nanogl-camera/perspective-lens';
import OrthographicLens from 'nanogl-camera/ortho-lens';


/**
 * Either a Perspective or Orthographic projection data
 */
export type ProjectionData = Gltf2.ICameraPerspective | Gltf2.ICameraOrthographic;


/**
 * The Camera element only contains a perspective or orthographic lens object, used to render the scene.
 */
export default class Camera implements IElement {

  readonly gltftype : GltfTypes.CAMERA = GltfTypes.CAMERA;
  name        : undefined | string;
  extras      : any   ;
  
  /**
   * Type of the camera, either perspective or orthographic
   */
  type : Gltf2.CameraType;

  /**
   * Either a Perspective or Orthographic projection data
   */
  projectionData : ProjectionData;

  /**
   * nanogl-camera lens object, either a PerspectiveLens or OrthographicLens
   */
  lens : ICameraLens;

  /**
   * Parse the Camera data, create the nanogl-camera lens object
   * @param gltfLoader GLTFLoader to use, unused here
   * @param data Data to parse
   */
  parse( gltfLoader:GltfLoader, data: Gltf2.ICamera ) : Promise<any>{

    this.type = data.type;

    switch( this.type ){
      
      case Gltf2.CameraType.PERSPECTIVE:
        this.projectionData = data.perspective;
        this.lens = this.createPerpective( this.projectionData );
        break;
      
      case Gltf2.CameraType.ORTHOGRAPHIC:
        this.projectionData = data.orthographic;
        this.lens = this.createOrtho( this.projectionData );
        break;

      default:
        throw new Error('Camera - unsupported type '+this.type );
        
    }

    return Promise.resolve();

  }

  /**
   * Create a PerspectiveLens from the glTF data
   * @param data Data coming from the glTF file, containing the perspective data
   */
  createPerpective( data : Gltf2.ICameraPerspective ) : ICameraLens {
    const lens = new PerspectiveLens();
    lens.near = data.znear
    lens.far  = data.zfar ?? 100 // todo: infinite projection
    lens.setVerticalFov( data.yfov )
    lens.aspect = data.aspectRatio ?? 1
    return lens;
  }

  /**
   * Create an OrthographicLens from the glTF data
   * @param data Data coming from the glTF file, containing the orthographic data
   */
  createOrtho( data : Gltf2.ICameraOrthographic ){
    const lens = new OrthographicLens();
    lens.near = data.znear
    lens.far  = data.zfar
    lens._xMin = -data.xmag;
    lens._xMax = data.xmag ;
    lens._yMin = -data.ymag;
    lens._yMax = data.ymag ;
    return lens;
  }
  
}
