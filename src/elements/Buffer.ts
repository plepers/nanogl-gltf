


import BaseElement from './BaseElement';

import Gltf from '../index'
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


export default class Buffer extends BaseElement {

  static TYPE : GltfTypes = GltfTypes.BUFFER;


  byteLength  :number       ;
  uri         : string      ;
  _bytes      : ArrayBuffer;
  _byteOffset :number       ;

  parse( gltfLoader : GltfLoader, data : Gltf2.IBuffer ){
    
    super.parse( gltfLoader, data );

    this.byteLength  = data.byteLength;
    this.uri         = data.uri;
    this._bytes      = null;

    this._byteOffset = 0;

  }

  

}

