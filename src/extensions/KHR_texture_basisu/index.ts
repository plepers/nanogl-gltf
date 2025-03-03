import { AbortSignalLike } from "@azure/abort-controller";
import Texture2D from "nanogl/texture-2d";
import { GLContext } from "nanogl/types";
import Image, { filterHasMipmap } from "../../elements/Image";
import Texture from "../../elements/Texture";
import GltfLoader from "../../io/GltfLoader";
import { createNativeSignal } from "../../lib/cancellation";
import { ElementOfType, PropertyType, AnyElement } from "../../types/Elements";
import Gltf2 from "../../types/Gltf2";
import GltfTypes from "../../types/GltfTypes";
import { IExtensionFactory, IExtensionInstance } from "../IExtension";
import { DecodingResponse, IBasisDecoder } from "./basis.types";

const EXT_ID = 'KHR_texture_basisu';


class BasisImage extends Image {

  private _basisFile: ArrayBuffer

  private _decodePromise: Promise<DecodingResponse> = null;


  get hasAlpha(): boolean {
    return false
  }

  constructor( private _decoder : IBasisDecoder ){
    super()
  }

  protected async loadImage(gltfLoader: GltfLoader): Promise<void> {
    this._basisFile = await this.loadBuffer(gltfLoader.abortSignal);
  }


  protected async loadBuffer(abortSignal: AbortSignalLike): Promise<ArrayBuffer> {

    if (this.bufferView) {
      // mimeType is guaranted here
      const ptr = this.bufferView.getByteOffset()
      return this.bufferView.buffer._bytes.slice( ptr, ptr + this.bufferView.byteLength );
    } else {
      // assume uri is defained as uri or data uri
      const signal = createNativeSignal(abortSignal)
      const request = await fetch(this.resolvedUri, { signal })
      const buffer = await request.arrayBuffer();
      return buffer;
    }

  }

  private decode(gl:GLContext) : Promise<DecodingResponse> {
    if( this._decodePromise === null ){
      this._decodePromise = this._decoder.decode( gl, this._basisFile );
    }
    return this._decodePromise;
  }

  public async setupTexture(texture: Texture2D, wrapS: GLenum, wrapT: GLenum, minFilter: GLenum, magFilter: GLenum): Promise<void> {

    const gl = texture.gl;
    const {
      buffer, 
      webglFormat,
      mipLevels
     } = await this.decode(gl)


    gl.bindTexture(gl.TEXTURE_2D, texture.id);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipLevels.length > 1 || webglFormat.uncompressed ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);

    let levelData = null;

    for (let mipLevel of mipLevels) {
      if (!webglFormat.uncompressed) {
        levelData = new Uint8Array(buffer, mipLevel.offset, mipLevel.size);
        gl.compressedTexImage2D(
          gl.TEXTURE_2D,
          mipLevel.level,
          webglFormat.format,
          mipLevel.width,
          mipLevel.height,
          0,
          levelData);
      } else {
        switch (webglFormat.type) {
          case WebGLRenderingContext.UNSIGNED_SHORT_4_4_4_4:
          case WebGLRenderingContext.UNSIGNED_SHORT_5_5_5_1:
          case WebGLRenderingContext.UNSIGNED_SHORT_5_6_5:
            levelData = new Uint16Array(buffer, mipLevel.offset, mipLevel.size / 2);
            break;
          default:
            levelData = new Uint8Array(buffer, mipLevel.offset, mipLevel.size);
            break;
        }
        gl.texImage2D(
          gl.TEXTURE_2D,
          mipLevel.level,
          webglFormat.format,
          mipLevel.width,
          mipLevel.height,
          0,
          webglFormat.format,
          webglFormat.type,
          levelData);
      }
    }

    
    if ( filterHasMipmap(minFilter) && webglFormat.uncompressed && mipLevels.length == 1) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    this._decodePromise = null;
    
  }

}


class BasisTexture extends Texture {

  async parse(gltfLoader: GltfLoader, data: Gltf2.ITexture) {

    if (data.sampler !== undefined) {
      this.sampler = await gltfLoader.getElement(GltfTypes.SAMPLER, data.sampler);
    }

    const sourceId = data.extensions[EXT_ID].source
    this.source = await gltfLoader.getElement(GltfTypes.IMAGE, sourceId);

  }

}

class Instance implements IExtensionInstance {


  readonly name: string = EXT_ID;
  readonly priority: number = 1;

  loader: GltfLoader;

  constructor(gltfLoader: GltfLoader, private _decoder : IBasisDecoder ) {
    this.loader = gltfLoader;
  }


  acceptElement<P extends Gltf2.Property>(data: P, element: ElementOfType<PropertyType<P>>): null | Promise<ElementOfType<PropertyType<P>>> {
    return null;
  }

  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;
  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    if (data.gltftype === GltfTypes.IMAGE && (data.mimeType as string === 'image/ktx2' || data.uri?.endsWith('ktx2'))) {
      const basisImg = new BasisImage(this._decoder)
      return basisImg.parse(this.loader, data).then(() => basisImg)
    }
    if (data.gltftype === GltfTypes.TEXTURE && data.extensions && data.extensions[EXT_ID]) {
      const tex =  new BasisTexture()
      return tex.parse(this.loader, data).then(() => tex)
    }
    return null;
  }

}


/**
 * This extension allows Textures to use the basisu format and Images to have an uri with a .ktx2 extension.
 * This format is useful to reduce texture size and memory usage.
 */
export default class KHR_texture_basisu implements IExtensionFactory {
  readonly name: string = EXT_ID;
  
  /**
   * @param decoder The decoder to use to decode the basis file
   */
  constructor( readonly decoder: IBasisDecoder ){
  }

  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new Instance(gltfLoader, this.decoder);
  }
}