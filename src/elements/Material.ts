

import { vec3 } from 'gl-matrix';
import GLConfig             from 'nanogl-state/config'    ;

import Gltf                 from '../index';
import BaseElement          from './BaseElement'         ;
import PbrMetallicRoughness from './PbrMetallicRoughness';
import NormalTextureInfo    from './NormalTextureInfo'   ;
import OcclusionTextureInfo from './OcclusionTextureInfo';
import TextureInfo          from './TextureInfo'         ;

import { GLContext } from 'nanogl/types';
import MaterialPass from 'nanogl-pbr/MaterialPass';
import StandardPass from 'nanogl-pbr/StandardPass'
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


export enum AlphaMode {
  OPAQUE = "OPAQUE" ,
  MASK   = "MASK"   ,
  BLEND  = "BLEND"  ,
}

export default class Material extends BaseElement {
  
  readonly gltftype : GltfTypes.MATERIAL = GltfTypes.MATERIAL;

  pbrMetallicRoughness?: PbrMetallicRoughness;
  normalTexture?       : NormalTextureInfo   ;
  occlusionTexture?    : OcclusionTextureInfo;
  emissiveTexture?     : TextureInfo         ;
  emissiveFactor       : vec3                ;
  alphaMode            : AlphaMode | string  ;
  alphaCutoff          : number              ;
  doubleSided          : boolean             ;
  
  
  glconfig: GLConfig;


  async parse( gltfLoader:GltfLoader, data: Gltf2.IMaterial ) : Promise<any>{

    super.parse( gltfLoader, data );

    this.emissiveFactor = <vec3> new Float32Array(data.emissiveFactor || [0,0,0]);

    this.alphaMode   = data.alphaMode || AlphaMode.OPAQUE;
    this.alphaCutoff = data.alphaCutoff ?? 0.5;
    this.doubleSided = data.doubleSided ?? false;

    if( data.pbrMetallicRoughness !== undefined ){
      this.pbrMetallicRoughness = new PbrMetallicRoughness()
      await this.pbrMetallicRoughness.parse( gltfLoader, data.pbrMetallicRoughness )
    }

    if( data.normalTexture !== undefined ){
      this.normalTexture = await gltfLoader._loadElement( data.normalTexture );
    }
    
    if( data.occlusionTexture !== undefined ){
      this.occlusionTexture = await gltfLoader._loadElement( data.occlusionTexture );
    }
    
    if( data.emissiveTexture !== undefined ){
      this.emissiveTexture = await gltfLoader._loadElement( data.emissiveTexture );
    }
  }


  materialPass : MaterialPass
  
  
  allocateGl( gl : GLContext ) {

    const pass = new StandardPass( this.name );
    
    pass.glconfig.enableCullface( !this.doubleSided );

    pass.occlusion.attachSampler

    this.materialPass = pass;
  }

}

