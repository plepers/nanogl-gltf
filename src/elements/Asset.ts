

import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


export default class Asset extends BaseElement {

  readonly gltftype : GltfTypes.ASSET = GltfTypes.ASSET;

  version    : string;
  copyright? : string;
  generator? : string;
  minVersion?: string;

  parse( gltfLoader:GltfLoader, data: Gltf2.IAsset ){

    super.parse( gltfLoader, data );

    this.version    = data.version;
    this.copyright  = data.copyright;
    this.generator  = data.generator;
    this.minVersion = data.minVersion;
  }

}

