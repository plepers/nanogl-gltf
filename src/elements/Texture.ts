


import Sampler from './Sampler';
import Image from './Image';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { GLContext } from 'nanogl/types';
import Texture2D from 'nanogl/texture-2d';
import { IElement } from '../types/Elements';
import Deferred from '../lib/Deferred';
import { AbortSignal } from '@azure/abort-controller';


export default class Texture implements IElement {

  readonly gltftype : GltfTypes.TEXTURE = GltfTypes.TEXTURE;

  name        : undefined | string;
  extras      : any   ;
  
  sampler:Sampler
  source: Image;
  glTexture : Texture2D;


  private _glTextureDeferred : Deferred<Texture2D> = new Deferred();
  private _defaultTextureFilter : GLenum

  get glTexturePromise() : Promise<Texture2D> {
    return this._glTextureDeferred.promise;
  }



  async parse( gltfLoader:GltfLoader, data: Gltf2.ITexture ){

    if( data.sampler !== undefined ){
      this.sampler = await gltfLoader.getElement( GltfTypes.SAMPLER, data.sampler );
    }

    if( data.source !== undefined ){
      this.source = await gltfLoader.getElement( GltfTypes.IMAGE, data.source );
    }

    this._defaultTextureFilter = gltfLoader.defaultTextureFilter;

    
  }
  
  /**
   * Setup the gl.TEXTURE_2D with minFilter, magFilter, wrapS and wrapT, depending on the sampler's options.
   * This allocates the texture memory and uploads the image data to the GPU so it can be used in a shader.
   * @param gl GL context
   */
  async allocateGl( gl : GLContext ) : Promise<void> {
    
    let glFormat = gl.RGB;
    if( this.source.hasAlpha )
      glFormat = gl.RGBA;


    let minFilter : GLenum = this._defaultTextureFilter
    let magFilter : GLenum = gl.LINEAR

    let wrapS : GLenum = gl.REPEAT
    let wrapT : GLenum = gl.REPEAT

    if( this.sampler ){
      minFilter = this.sampler.minFilter ?? minFilter
      magFilter = this.sampler.magFilter ?? gl.LINEAR
      wrapS = this.sampler.wrapS
      wrapT = this.sampler.wrapT
    }
    
    this.glTexture = new Texture2D( gl, glFormat, gl.UNSIGNED_BYTE );

    await this.source.setupTexture(this.glTexture, wrapS, wrapT, minFilter, magFilter);

    this.glTexture.bind();

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this._glTextureDeferred.resolve( this.glTexture );

  }
  

}

