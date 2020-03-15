


import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import Texture from './Texture';
import { IElement } from '../types/Elements';


export default class OcclusionTextureInfo implements IElement {

  readonly gltftype : GltfTypes.OCCLUSION_TEXTURE_INFO = GltfTypes.OCCLUSION_TEXTURE_INFO;

  name        : undefined | string;
  extras      : any   ;
  
  texture : Texture;
  texCoord: number;
  strength: number;


  async parse( gltfLoader:GltfLoader, data: Gltf2.IMaterialOcclusionTextureInfo ) : Promise<any>{
    this.texture = await gltfLoader.getElement( GltfTypes.TEXTURE, data.index );
    this.texCoord = data.texCoord ?? 0;
    this.strength = data.strength ?? 1;
  }



}

