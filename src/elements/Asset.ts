

import { ElementType } from '../consts';
import { Data_Scene, Data_Asset } from '../schema/glTF';
import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Node        from './Node'       ;


export default class Asset extends BaseElement {

  static TYPE = ElementType.ASSET;

  version    : string;
  copyright? : string;
  generator? : string;
  minVersion?: string;

  parse( gltf: Gltf, data: Data_Asset ){

    super.parse( gltf, data );

    this.version    = data.version;
    this.copyright  = data.copyright;
    this.generator  = data.generator;
    this.minVersion = data.minVersion;
  }

}

