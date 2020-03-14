


import BaseElement from './BaseElement';
import BufferView from './BufferView';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


const _HAS_CIB : boolean = ( window.createImageBitmap !== undefined );

export default class Image extends BaseElement {

  readonly gltftype : GltfTypes.IMAGE = GltfTypes.IMAGE;


  uri?         : string;
  resolvedUri? : string;
  mimeType?    : Gltf2.ImageMimeType;
  bufferView?  : BufferView;
  
  texImageSource : TexImageSource;

  async parse( gltfLoader:GltfLoader, data: Gltf2.IImage ) : Promise<any>{

    super.parse( gltfLoader, data );

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
    
    this.texImageSource = await this.loadImage();

  }

  private async loadImage() : Promise<TexImageSource> {
    
    if( this.bufferView ){
      // mimeType is guaranted here
      const arrayView = new Uint8Array( 
        this.bufferView.buffer._bytes, 
        this.bufferView.getByteOffset(), 
        this.bufferView.byteLength 
      );
      
      const blob = new Blob( [arrayView] , { type: this.mimeType });
      return this.loadImageBuffer( blob );
    } else {
      // assume uri is defained as uri or data uri
      const request = await fetch( this.resolvedUri )
      const blob = await request.blob();
      return this.loadImageBuffer( blob );
    }
  }

  private async loadImageBuffer( blob : Blob ) : Promise<TexImageSource> {
    
    if( _HAS_CIB )
    {
      return createImageBitmap( blob );
    } 
    else {
      
      const img = new window.Image();
      const src = URL.createObjectURL(blob);

      new Promise( (resolve, reject)=>{
        img.onload  = resolve;
        img.onerror = reject;
        img.src = src;
      })
      .finally( ()=>URL.revokeObjectURL(src) )
      .then( ()=>img );

    }
  }

}

