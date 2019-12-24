

import { ElementType } from '../consts';
import { Data_TextureInfo } from '../schema/glTF';
import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Texture from './Texture';


export default class TextureInfo extends BaseElement {


  static TYPE = ElementType.TEXTURE_INFO;
  
  texture : Texture;
  texCoord: number;


  parse( gltf: Gltf, data: Data_TextureInfo ){

    super.parse( gltf, data );

    this.texture = gltf.getElement<Texture>( ElementType.TEXTURE, data.index );

    this.texCoord = data.texCoord ?? 0;
  }

}

