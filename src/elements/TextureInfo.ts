


import Texture from './Texture';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';
import Gltf from '../Gltf';
import { Sampler } from 'nanogl-pbr/Input';
import TexCoord from 'nanogl-pbr/TexCoord';


/**
 * Base interface for TextureInfo classes
 */
export interface ITextureInfo {

  /**
   * Texture element used as the texture data
   */
  texture : Texture

  /**
   * Index of the texture's TEXCOORD attribute to use
   */
  texCoord: number

  /**
   * Create a nanogl-pbr Sampler object, used to sample the texture.
   * @param id ID or name to use for the sampler, to differentiate multiple samplers on the same Program
   */
  createSampler( id : string ) : Sampler
}


/**
 * The BaseTextureInfo element contains the base properties and methods for TextureInfo, NormalTextureInfo and OcclusionTextureInfo.
 * It contains the texture and the texCoord to use to sample the texture, and a createSampler() method to create a nanogl-pbr Sampler object.
 */
export abstract class BaseTextureInfo implements ITextureInfo {
  
  name        : undefined | string;
  extras      : any   ;

  /**
   * Texture element used as the texture data
   */
  texture : Texture;

  /**
   * Index of the texture's TEXCOORD attribute to use. Default to 0
   */
  texCoord: number; 
  
  /**
   * nanogl-pbr Sampler object, used to sample the texture.
   */
  _sampler: Sampler = null;
  

  /**
   * Create a nanogl-pbr Sampler object, used to sample the texture.
   * @param id ID or name to use for the sampler, to differentiate multiple samplers on the same Program
   */
  createSampler( id : string ) : Sampler {
    if( this._sampler === null ){
      const attrib = Gltf.getSemantics().getAttributeName( `TEXCOORD_${this.texCoord}` )
      this._sampler = new Sampler( `tex_${this.name??''}${id}`, TexCoord.create( attrib ) )
      this.texture.glTexturePromise.then( (t)=> this._sampler.set( t ) )
    }
    return this._sampler;
  }

  /**
   * Parse the BaseTextureInfo data, fill the texture and texCoord properties.
   * 
   * Is async as it needs to wait for the texture to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse( gltfLoader:GltfLoader, data: any ) : Promise<any>{
    this.texture = await gltfLoader.getElement( GltfTypes.TEXTURE, data.index );
    this.texCoord = data.texCoord ?? 0;
  }

}


/**
 * The TextureInfo element contains the texture and the texCoord to use to sample the texture.
 */
export default class TextureInfo extends BaseTextureInfo implements IElement, ITextureInfo {
  readonly gltftype : GltfTypes.TEXTURE_INFO = GltfTypes.TEXTURE_INFO;  
}
