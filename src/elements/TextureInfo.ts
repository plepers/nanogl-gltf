


import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Texture from './Texture';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';



export default class TextureInfo extends BaseElement {


  readonly gltftype : GltfTypes.TEXTURE_INFO = GltfTypes.TEXTURE_INFO;
  
  texture : Texture;
  texCoord: number;


  async parse( gltfLoader:GltfLoader, data: Gltf2.ITextureInfo ) : Promise<any>{
    super.parse( gltfLoader, data );

    this.texture = await gltfLoader.getElement( GltfTypes.TEXTURE, data.index );
    this.texCoord = data.texCoord ?? 0;
  }

}

