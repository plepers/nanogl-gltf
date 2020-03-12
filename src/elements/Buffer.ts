


import BaseElement from './BaseElement';

import Gltf from '../index'
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import Assert from '../lib/assert';


export default class Buffer extends BaseElement {

  static TYPE : GltfTypes = GltfTypes.BUFFER;


  byteLength  :number       ;
  uri         : string      ;
  _bytes      : ArrayBuffer;
  _byteOffset :number       ;

  async parse( gltfLoader : GltfLoader, data : Gltf2.IBuffer ) : Promise<any> {
    
    super.parse( gltfLoader, data );

    this.byteLength  = data.byteLength;
    this.uri         = data.uri;

    this._byteOffset = 0;

    this._bytes      = await gltfLoader.loadBufferUri( data.uri );
    Assert.isTrue( this._bytes !== null )
  }

  

}

