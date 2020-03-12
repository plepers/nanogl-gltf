


import Gltf        from '../index'     ;
import { vec4 } from 'gl-matrix';
import TextureInfo from './TextureInfo';
import BaseElement from './BaseElement';
import Texture from './Texture';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';


export default class PbrMetallicRoughness {


  baseColorFactor          : vec4       ;
  metallicFactor           : number     ;
  roughnessFactor          : number     ;
  baseColorTexture         : TextureInfo;
  metallicRoughnessTexture : TextureInfo;
  


  parse( gltfLoader:GltfLoader, data: Gltf2.IMaterialPbrMetallicRoughness ){


    this.baseColorFactor = <vec4> new Float32Array(data.baseColorFactor || [1,1,1,1]);
    
    this.metallicFactor  = data.metallicFactor ?? 1
    this.roughnessFactor = data.roughnessFactor ?? 1

    if( data.baseColorTexture !== undefined ){
      this.baseColorTexture = new TextureInfo();
      this.baseColorTexture.parse( gltfLoader, data.baseColorTexture );
    }

    if( data.metallicRoughnessTexture !== undefined ){
      this.metallicRoughnessTexture = new TextureInfo();
      this.metallicRoughnessTexture.parse( gltfLoader, data.metallicRoughnessTexture );
    }

  }

}

