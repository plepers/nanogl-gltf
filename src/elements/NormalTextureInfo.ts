

import { ElementType } from '../consts';
import { Data_MaterialNormalTextureInfo } from '../schema/glTF';
import Gltf        from '../index'     ;
import TextureInfo from './TextureInfo';


export default class NormalTextureInfo extends TextureInfo {


  static TYPE = ElementType.NORMAL_TEXTURE_INFO;
  
  scale: number;
  


  parse( gltf: Gltf, data: Data_MaterialNormalTextureInfo ){

    super.parse( gltf, data );

    this.scale = data.scale ?? 1.0;

  }

}

