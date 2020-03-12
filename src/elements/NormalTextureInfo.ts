


import Gltf        from '../index'     ;
import TextureInfo from './TextureInfo';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import BaseElement from './BaseElement';
import Texture from './Texture';


export default class NormalTextureInfo extends BaseElement {

  readonly gltftype : GltfTypes.NORMAL_TEXTURE_INFO = GltfTypes.NORMAL_TEXTURE_INFO;
  
  texture : Texture;
  texCoord: number;
  
  scale: number;


  async parse( gltfLoader:GltfLoader, data: Gltf2.IMaterialNormalTextureInfo ) : Promise<any>{
    
    super.parse( gltfLoader, data );
    
    this.texture = await gltfLoader.getElement( GltfTypes.TEXTURE, data.index );
    this.texCoord = data.texCoord ?? 0;
    this.scale = data.scale ?? 1.0;

  }

}

