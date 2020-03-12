


import Gltf        from '../index'     ;
import TextureInfo from './TextureInfo';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import BaseElement from './BaseElement';
import Texture from './Texture';


export default class OcclusionTextureInfo extends BaseElement {

  readonly gltftype : GltfTypes.OCCLUSION_TEXTURE_INFO = GltfTypes.OCCLUSION_TEXTURE_INFO;

  texture : Texture;
  texCoord: number;
  strength: number;


  async parse( gltfLoader:GltfLoader, data: Gltf2.IMaterialOcclusionTextureInfo ) : Promise<any>{
    super.parse( gltfLoader, data );

    this.texture = await gltfLoader.getElement( GltfTypes.TEXTURE, data.index );
    this.texCoord = data.texCoord ?? 0;
    this.strength = data.strength ?? 1;
  }



}

