

import { ElementType } from '../consts';
import {  Data_Texture } from '../schema/glTF';
import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Sampler from './Sampler';
import Image from './Image';


export default class Texture extends BaseElement {

  static TYPE = ElementType.TEXTURE;

  sampler:Sampler
  source: Image;

  parse( gltf: Gltf, data: Data_Texture ){

    super.parse( gltf, data );

    if( data.sampler !== undefined ){
      this.sampler = gltf.getElement<Sampler>( ElementType.SAMPLER, data.sampler );
    }

    if( data.source !== undefined ){
      this.source = gltf.getElement<Image>( ElementType.IMAGE, data.source );
    }
    
  }

}

