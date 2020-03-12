

import BaseElement from './BaseElement';
import AnimationChannel from './AnimationChannel';
import AnimationSampler from './AnimationSampler';

import Gltf2 from '../types/Gltf2'
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


function createSampler(gltfLoader:GltfLoader, data:Gltf2.IAnimationSampler){
  const sampler = new AnimationSampler();
  sampler.parse( gltfLoader, data );
  return sampler;
}


function createChannel(gltfLoader:GltfLoader, data:Gltf2.IAnimationChannel, animation:Animation ){
  const channel = new AnimationChannel();
  channel.parse( gltfLoader, data, animation );
  return channel;
}


export default class Animation extends BaseElement {

  readonly gltftype : GltfTypes.ANIMATION = GltfTypes.ANIMATION;

  samplers : AnimationSampler[] = []
  channels : AnimationChannel[] = []

  parse(gltfLoader:GltfLoader, data : Gltf2.IAnimation) {

    super.parse(gltfLoader, data);

    this.samplers = data.samplers.map(
      d => createSampler(gltfLoader, d)
    );
    
    this.gltf.addElements(this.samplers);

    this.channels = data.channels.map(
      d => createChannel(gltfLoader, d, this)
    );
    
    this.gltf.addElements(this.channels);

  }


  evaluate( t :number ){
    for (var channel of this.channels ) {
      channel.evaluate( t );
    }
  }


  getChannel(i:number):AnimationChannel {
    return this.channels[i];
  }


  getSampler(i:number):AnimationSampler {
    return this.samplers[i];
  }

}
