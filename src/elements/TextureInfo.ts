


import Texture from './Texture';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';



export default class TextureInfo implements IElement {


  readonly gltftype : GltfTypes.TEXTURE_INFO = GltfTypes.TEXTURE_INFO;
  
  name        : undefined | string;
  extras      : any   ;
  
  texture : Texture;
  texCoord: number;


  async parse( gltfLoader:GltfLoader, data: Gltf2.ITextureInfo ) : Promise<any>{
    this.texture = await gltfLoader.getElement( GltfTypes.TEXTURE, data.index );
    this.texCoord = data.texCoord ?? 0;
  }

}

