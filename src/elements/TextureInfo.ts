


import Texture from './Texture';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';
import TexCoordCollection from 'nanogl-pbr/TexCoordCollection';
import Gltf from '..';

export interface ITextureInfo {
  texture : Texture;
  texCoord: number;
  createMaterialTexCoords( texCoords : TexCoordCollection ) : string;
}

export abstract class BaseTextureInfo implements ITextureInfo {
  
  name        : undefined | string;
  extras      : any   ;

  texture : Texture;
  texCoord: number;  
  
  createMaterialTexCoords(texCoords : TexCoordCollection ) : string {
    const attrib = Gltf.getSemantics().getAttributeName( `TEXCOORD_${this.texCoord}` )
    return texCoords.getTexCoord( attrib ).varying()
  }


  async parse( gltfLoader:GltfLoader, data: any ) : Promise<any>{
    this.texture = await gltfLoader.getElement( GltfTypes.TEXTURE, data.index );
    this.texCoord = data.texCoord ?? 0;
  }

}

export default class TextureInfo extends BaseTextureInfo implements IElement, ITextureInfo {
  readonly gltftype : GltfTypes.TEXTURE_INFO = GltfTypes.TEXTURE_INFO;  

}

