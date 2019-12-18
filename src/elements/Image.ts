

import { ElementType } from '../consts';
import { Data_Image } from '../schema/glTF';
import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import BufferView from './BufferView';


export default class Image extends BaseElement {

  static TYPE = ElementType.IMAGE;


  uri?        : string;
  mimeType?   : string;
  bufferView? : BufferView;

  parse( gltf: Gltf, data: Data_Image ){

    super.parse( gltf, data );

    this.uri = data.uri;
    this.mimeType = data.mimeType;

    if( data.bufferView !== undefined ){
      this.bufferView = gltf.getElement( ElementType.BUFFERVIEW, data.bufferView );
    }

  }

}

