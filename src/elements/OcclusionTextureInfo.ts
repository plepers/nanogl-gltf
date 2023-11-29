


import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';
import { ITextureInfo, BaseTextureInfo } from './TextureInfo';


/**
 * The OcclusionTextureInfo element is a BaseTextureInfo but with strength attribute to manage the occlusion effect.
 */
export default class OcclusionTextureInfo extends BaseTextureInfo implements IElement, ITextureInfo {

  readonly gltftype : GltfTypes.OCCLUSION_TEXTURE_INFO = GltfTypes.OCCLUSION_TEXTURE_INFO;

  /**
   * Strength of the occlusion effect between 0 (no occlusion) and 1 (full occlusion). Default to 1
   */
  strength: number;

  async parse( gltfLoader:GltfLoader, data: Gltf2.IMaterialOcclusionTextureInfo ) : Promise<any>{
    await super.parse( gltfLoader, data );
    this.strength = data.strength ?? 1;
  }

}
