


import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import BufferView from './BufferView';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


export default class Image extends BaseElement {

  readonly gltftype : GltfTypes.IMAGE = GltfTypes.IMAGE;


  uri?        : string;
  mimeType?   : string;
  bufferView? : BufferView;

  async parse( gltfLoader:GltfLoader, data: Gltf2.IImage ) : Promise<any>{

    super.parse( gltfLoader, data );

    this.uri = data.uri;
    this.mimeType = data.mimeType;

    if( data.bufferView !== undefined ){
      this.bufferView = await gltfLoader.getElement( GltfTypes.BUFFERVIEW, data.bufferView );
    }

  }

}

