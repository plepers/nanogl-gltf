


import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import Texture from './Texture';
import { IElement } from '../types/Elements';
import { ITextureInfo, BaseTextureInfo } from './TextureInfo';
import UVTransform from '../glsl/UVTransform';
import Gltf from '..';


export default class OcclusionTextureInfo extends BaseTextureInfo implements IElement, ITextureInfo {

  readonly gltftype : GltfTypes.OCCLUSION_TEXTURE_INFO = GltfTypes.OCCLUSION_TEXTURE_INFO;
  strength: number;

  async parse( gltfLoader:GltfLoader, data: Gltf2.IMaterialOcclusionTextureInfo ) : Promise<any>{
    await super.parse( gltfLoader, data );
    this.strength = data.strength ?? 1;
  }



}

