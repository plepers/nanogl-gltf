

import Gltf from '../Gltf'
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import Assert from '../lib/assert';
import { IElement } from '../types/Elements';


/**
 * The Buffer element contains raw binary data, used to store data about geometry, animations, skins or textures.
 * Comes from an external file or is stored in the GLTF file as a base64 string.
 */
export default class Buffer implements IElement {

  readonly gltftype : GltfTypes.BUFFER = GltfTypes.BUFFER;
  name        : undefined | string;
  extras      : any   ;
  
  /**
   * Length of the buffer data in bytes
   */
  byteLength  :number       ;

  /**
   * URI to the buffer data
   */
  uri         : string      ;

  /**
   * ArrayBuffer containing the raw buffer data
   */
  _bytes      : ArrayBuffer;

  /**
   * Offset in bytes in the buffer to the data
   */
  _byteOffset :number       ;


  /**
   * Parse the Buffer data, load the buffer data from the uri and store them in _bytes attribute.
   * 
   * Is async as it needs to wait for the buffer data to be loaded.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse( gltfLoader : GltfLoader, data : Gltf2.IBuffer ) : Promise<any> {
    
    this.byteLength  = data.byteLength;
    this.uri         = data.uri;

    this._byteOffset = 0;

    this._bytes      = await gltfLoader.loadBufferUri( data.uri );
    Assert.isTrue( this._bytes !== null )
  }

}
