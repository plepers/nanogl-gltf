


import Gltf        from '../index'     ;
import TextureInfo from './TextureInfo';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


export default class OcclusionTextureInfo extends TextureInfo {


  readonly gltftype : GltfTypes.OCCLUSION_TEXTURE_INFO = GltfTypes.OCCLUSION_TEXTURE_INFO;

  strength: number;

  parse( gltfLoader:GltfLoader, data: Gltf2.IMaterialOcclusionTextureInfo ){

    super.parse( gltfLoader, data );

    this.strength = data.strength ?? 1;

  }

}

