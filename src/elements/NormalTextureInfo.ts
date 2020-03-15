
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import Texture from './Texture';
import { IElement } from '../types/Elements';


export default class NormalTextureInfo implements IElement {

  readonly gltftype : GltfTypes.NORMAL_TEXTURE_INFO = GltfTypes.NORMAL_TEXTURE_INFO;
  
  name        : undefined | string;
  extras      : any   ;

  texture : Texture;
  texCoord: number;
  
  scale: number;


  async parse( gltfLoader:GltfLoader, data: Gltf2.IMaterialNormalTextureInfo ) : Promise<any>{
    
    this.texture = await gltfLoader.getElement( GltfTypes.TEXTURE, data.index );
    this.texCoord = data.texCoord ?? 0;
    this.scale = data.scale ?? 1.0;

  }

}

