


import Sampler from './Sampler';
import Image from './Image';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { GLContext } from 'nanogl/types';
import Texture2D from 'nanogl/texture-2d';
import { IElement } from '../types/Elements';
import Deferred from '../lib/Deferred';


const GL_REPEAT                         = 0x2901;
const GL_MIRRORED_REPEAT                = 0x8370;

export function filterHasMipmap(filter : GLenum) : boolean {
  return (filter & (1 << 8)) === (1 << 8);
}

export function wrapRequirePot(wrap : GLenum ) : boolean {
  return wrap === GL_REPEAT || wrap === GL_MIRRORED_REPEAT;
}

export function isPowerOf2(n : number ) : boolean {
  return (n != 0 && (n & (n-1)) === 0);
}

function nearestPowerOf2(n:number) : number {
    if( isPowerOf2(n) ) return n;
    if (n % 2 === 1) n++;
    return Math.pow(2.0, Math.round(Math.log(n) / Math.log(2.0)));
}



export default class Texture implements IElement {

  readonly gltftype : GltfTypes.TEXTURE = GltfTypes.TEXTURE;

  name        : undefined | string;
  extras      : any   ;
  
  sampler:Sampler
  source: Image;
  glTexture : Texture2D;


  private _glTextureDeferred : Deferred<Texture2D> = new Deferred();

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

  }
  
  
  async allocateGl( gl : GLContext ) : Promise<any> {
    
    let glFormat = gl.RGBA;
    if( this.source.mimeType === Gltf2.ImageMimeType.JPEG )
      glFormat = gl.RGBA;


    let minFilter : GLenum = gl.LINEAR
    let magFilter : GLenum = gl.LINEAR

    let wrapS : GLenum = gl.REPEAT
    let wrapT : GLenum = gl.REPEAT

    if( this.sampler ){
      minFilter = this.sampler.minFilter ?? gl.LINEAR
      magFilter = this.sampler.magFilter ?? gl.LINEAR
      wrapS = this.sampler.wrapS
      wrapT = this.sampler.wrapT
    }

    
    /*
      TODO: implement texture resize
      Resize source to POT if needed : if the sampler the texture references
      Has a wrapping mode (either wrapS or wrapT) equal to REPEAT or MIRRORED_REPEAT, or
      Has a minification filter (minFilter) that uses mipmapping (NEAREST_MIPMAP_NEAREST, NEAREST_MIPMAP_LINEAR, LINEAR_MIPMAP_NEAREST, or LINEAR_MIPMAP_LINEAR).
    */
    let texImageSource = this.source.texImageSource;
    if( wrapRequirePot(wrapS) || wrapRequirePot( wrapT ) || filterHasMipmap(minFilter) ){
      if( !isPowerOf2(texImageSource.width) || !isPowerOf2(texImageSource.height) )
        texImageSource = await this.resizeToPOT( texImageSource, gl );
    }


    this.glTexture = new Texture2D( gl, glFormat, gl.UNSIGNED_BYTE );
    this.glTexture.fromImage( texImageSource );

    
    if( filterHasMipmap(minFilter) ){
      gl.generateMipmap( gl.TEXTURE_2D );
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);

    this._glTextureDeferred.resolve( this.glTexture );

  }

  async resizeToPOT( source: TexImageSource, gl : GLContext ) : Promise<TexImageSource> {
    // throw new Error( "Not implemented - Texture source need to be resized to power of 2" );
    // return source;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width  = nearestPowerOf2( source.width );
    canvas.height = nearestPowerOf2( source.height );
    
    if( source instanceof ImageData ){
      const imageBitmap = await  createImageBitmap( source, 0, 0, canvas.width, canvas.height );
      context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
    } else {
      context.drawImage(source, 0, 0, canvas.width, canvas.height);
    }

    return canvas;
    // return context.createImageData( canvas.width, canvas.height );

  }
  

}

