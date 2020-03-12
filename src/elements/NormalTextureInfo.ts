


import Gltf        from '../index'     ;
import TextureInfo from './TextureInfo';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


export default class NormalTextureInfo extends TextureInfo {


  readonly gltftype : GltfTypes.NORMAL_TEXTURE_INFO = GltfTypes.NORMAL_TEXTURE_INFO;
  
  scale: number;
  


  parse( gltfLoader:GltfLoader, data: Gltf2.IMaterialNormalTextureInfo ){

    super.parse( gltfLoader, data );

    this.scale = data.scale ?? 1.0;

  }

}

