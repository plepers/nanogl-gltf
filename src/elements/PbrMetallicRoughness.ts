

import { ElementType } from '../consts';
import { Data_TextureInfo, Data_MaterialPBRMetallicRoughness } from '../schema/glTF';
import Gltf        from '../index'     ;
import { vec4 } from 'gl-matrix';
import TextureInfo from './TextureInfo';
import BaseElement from './BaseElement';
import Texture from './Texture';


export default class PbrMetallicRoughness extends BaseElement {


  static TYPE = ElementType.PBR_METALLIC_ROUGHNESS;


  baseColorFactor          : vec4       ;
  metallicFactor           : number     ;
  roughnessFactor          : number     ;
  baseColorTexture         : TextureInfo;
  metallicRoughnessTexture : TextureInfo;
  


  parse( gltf: Gltf, data: Data_MaterialPBRMetallicRoughness ){

    super.parse( gltf, data );

    this.baseColorFactor = <vec4> new Float32Array(data.baseColorFactor || [1,1,1,1]);
    
    this.metallicFactor  = data.metallicFactor ?? 1
    this.roughnessFactor = data.roughnessFactor ?? 1

    if( data.baseColorTexture !== undefined ){
      this.baseColorTexture = new TextureInfo();
      this.baseColorTexture.parse( gltf, data.baseColorTexture );
    }

    if( data.metallicRoughnessTexture !== undefined ){
      this.metallicRoughnessTexture = new TextureInfo();
      this.metallicRoughnessTexture.parse( gltf, data.metallicRoughnessTexture );
    }

  }

}

