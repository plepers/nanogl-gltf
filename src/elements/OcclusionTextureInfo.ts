

import { ElementType } from '../consts';
import { Data_MaterialOcclusionTextureInfo } from '../schema/glTF';
import Gltf        from '../index'     ;
import TextureInfo from './TextureInfo';


export default class OcclusionTextureInfo extends TextureInfo {


  static TYPE = ElementType.OCCLUSION_TEXTURE_INFO;

  strength: number;

  parse( gltf: Gltf, data: Data_MaterialOcclusionTextureInfo ){

    super.parse( gltf, data );

    this.strength = data.strength ?? 1;

  }

}

