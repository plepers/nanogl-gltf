

import { vec3 } from 'gl-matrix';
import GLConfig             from 'nanogl-state/config'    ;
import Node                 from 'nanogl-node'            ;

import { ElementType   } from '../consts'     ;
import { Data_Material } from '../schema/glTF';
import   Gltf            from '../index'      ;

import BaseElement          from './BaseElement'          ;
import PbrMetallicRoughness from './PbrMetallicRoughness' ;
import NormalTextureInfo    from './NormalTextureInfo'    ;
import OcclusionTextureInfo from './OcclusionTextureInfo' ;
import TextureInfo          from './TextureInfo'          ;

import MaterialPass from 'nanogl-pbr/MaterialPass'



export enum AlphaMode {
  OPAQUE = "OPAQUE" ,
  MASK   = "MASK"   ,
  BLEND  = "BLEND"  ,
}

export default class Material extends BaseElement {
  
  
  static TYPE : ElementType = ElementType.MATERIAL;
  
  
  pbrMetallicRoughness : PbrMetallicRoughness;
  normalTexture        : NormalTextureInfo   ;
  occlusionTexture     : OcclusionTextureInfo;
  emissiveTexture      : TextureInfo         ;
  emissiveFactor       : vec3                ;
  alphaMode            : AlphaMode | string  ;
  alphaCutoff          : number              ;
  doubleSided          : boolean             ;
  
  
  glconfig: GLConfig;


  parse( gltf: Gltf, data: Data_Material ){

    super.parse( gltf, data );

    this.emissiveFactor = <vec3> new Float32Array(data.emissiveFactor || [0,0,0]);

    this.alphaMode   = data.alphaMode || AlphaMode.OPAQUE;
    this.alphaCutoff = data.alphaCutoff ?? 0.5;
    this.doubleSided = data.doubleSided ?? false;

    if( data.pbrMetallicRoughness !== undefined ){
      this.pbrMetallicRoughness = new PbrMetallicRoughness()
      this.pbrMetallicRoughness.parse( gltf, data.pbrMetallicRoughness )
    }

    if( data.normalTexture !== undefined ){
      this.normalTexture = new NormalTextureInfo()
      this.normalTexture.parse( gltf, data.normalTexture )
    }

    if( data.occlusionTexture !== undefined ){
      this.occlusionTexture = new OcclusionTextureInfo()
      this.occlusionTexture.parse( gltf, data.occlusionTexture )
    }

    if( data.emissiveTexture !== undefined ){
      this.emissiveTexture = new TextureInfo()
      this.emissiveTexture.parse( gltf, data.emissiveTexture )
    }
  }


  pass : MaterialPass;

  

}

