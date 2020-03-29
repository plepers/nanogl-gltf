


import BufferView from './BufferView';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';
import { AbortSignalLike } from '@azure/abort-controller';
import { createNativeSignal } from '../lib/cancellation';


const _HAS_CIB : boolean = ( window.createImageBitmap !== undefined );

export default class Image implements IElement {

  readonly gltftype : GltfTypes.IMAGE = GltfTypes.IMAGE;

  name        : undefined | string;
  extras      : any   ;

  uri?         : string;
  resolvedUri? : string;
  mimeType?    : Gltf2.ImageMimeType;
  bufferView?  : BufferView;
  
  texImageSource : TexImageSource;

  async parse( gltfLoader:GltfLoader, data: Gltf2.IImage ) : Promise<any>{

    if( data.uri ){
      this.uri = data.uri;

      if( this.uri.indexOf('data:' )==0 ){
        this.resolvedUri = this.uri;
      } else {
        this.resolvedUri = gltfLoader.resolveUri( this.uri );
      }
    }

    
    
    this.mimeType = data.mimeType;
    
    if( data.bufferView !== undefined ){
      this.bufferView = await gltfLoader.getElement( GltfTypes.BUFFERVIEW, data.bufferView );
    }
    

    
    const blob = await this.loadImageBlob(gltfLoader.abortSignal);
    this.texImageSource = await gltfLoader.gltfIO.loadImageBlob( blob, gltfLoader.abortSignal );

  }

  private async loadImageBlob( abortSignal : AbortSignalLike ) : Promise<Blob> {

    if( this.bufferView ){
      // mimeType is guaranted here
      const arrayView = new Uint8Array( 
        this.bufferView.buffer._bytes, 
        this.bufferView.getByteOffset(), 
        this.bufferView.byteLength 
        );
        return new Blob( [arrayView] , { type: this.mimeType });
      } else {
        // assume uri is defained as uri or data uri
      const signal = createNativeSignal( abortSignal )
      const request = await fetch( this.resolvedUri, {signal} )
      const blob = await request.blob();
      return blob;
    }
  }

 

}

