


import Gltf        from '../index'     ;
import BaseElement from './BaseElement';
import Sampler from './Sampler';
import Image from './Image';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


export default class Texture extends BaseElement {

  readonly gltftype : GltfTypes.TEXTURE = GltfTypes.TEXTURE;

  sampler:Sampler
  source: Image;

  parse( gltfLoader:GltfLoader, data: Gltf2.ITexture ){

    super.parse( gltfLoader, data );

    if( data.sampler !== undefined ){
      this.sampler = this.gltf.getElement<Sampler>( GltfTypes.SAMPLER, data.sampler );
    }

    if( data.source !== undefined ){
      this.source = this.gltf.getElement<Image>( GltfTypes.IMAGE, data.source );
    }
    
  }

}

