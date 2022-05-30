import { AbortSignalLike } from "@azure/abort-controller";
import Image from "../../elements/Image";
import Texture from "../../elements/Texture";
import GltfLoader from "../../io/GltfLoader";
import { createNativeSignal } from "../../lib/cancellation";
import { ElementOfType, PropertyType, AnyElement } from "../../types/Elements";
import Gltf2 from "../../types/Gltf2";
import GltfTypes from "../../types/GltfTypes";
import { IExtensionFactory, IExtensionInstance } from "../IExtension";

const EXT_ID  = 'KHR_texture_basisu';

class BasisImage extends Image {

  protected async loadImage(gltfLoader: GltfLoader): Promise<void> {
    const buffer = await this.loadBuffer(gltfLoader.abortSignal);
    this.texImageSource = await gltfLoader.gltfIO.loadImageBlob(blob, gltfLoader.abortSignal);
  }


  protected async loadBuffer(abortSignal: AbortSignalLike): Promise<ArrayBuffer> {

    if (this.bufferView) {
      // mimeType is guaranted here
      const arrayView = new Uint8Array(
        this.bufferView.buffer._bytes,
        this.bufferView.getByteOffset(),
        this.bufferView.byteLength
      );
    } else {
      // assume uri is defained as uri or data uri
      const signal = createNativeSignal(abortSignal)
      const request = await fetch(this.resolvedUri, { signal })
      const buffer = await request.arrayBuffer();
      return buffer;
    }

  }

}


class BasisTexture extends Texture {

  async parse( gltfLoader:GltfLoader, data: Gltf2.ITexture ){

    if( data.sampler !== undefined ){
      this.sampler = await gltfLoader.getElement( GltfTypes.SAMPLER, data.sampler );
    }
    
    const sourceId = data.extensions[EXT_ID].source
    this.source = await gltfLoader.getElement( GltfTypes.IMAGE, sourceId );

  }
  
}

class Instance implements IExtensionInstance {


  readonly name: string = EXT_ID;
  readonly priority: number = -1;
  
  loader: GltfLoader;

  constructor( gltfLoader : GltfLoader) {
    this.loader = gltfLoader;
  }

  
  acceptElement<P extends Gltf2.Property>(data: P, element: ElementOfType<PropertyType<P>> ) : null | Promise<ElementOfType<PropertyType<P>>> {
    return null;
  }

  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;
  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    
    if( data.gltftype === GltfTypes.IMAGE && (data.mimeType as string === 'image/ktx2' || data.uri.endsWith('ktx2') ) ){
      const basisImg = new BasisImage();
      return basisImg.parse(this.loader, data).then(()=>basisImg);
    }

    if( data.gltftype === GltfTypes.TEXTURE && data.extensions && data.extensions[EXT_ID] ){
      return this.loadBasis( data );
    }
    return null;
  }

}

export default class KHR_texture_basisu implements IExtensionFactory {
  readonly name: string = EXT_ID;
  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new Instance(gltfLoader);
  }
}