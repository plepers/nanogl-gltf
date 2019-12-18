

import BaseElement from './BaseElement';
import { ElementType } from '../consts';
import AnimationChannel from './AnimationChannel';
import AnimationSampler from './AnimationSampler';

import Gltf from '../index'
import { Data_Animation, Data_AnimationSampler, Data_AnimationChannel } from '../schema/glTF';


function createSampler(gltf:Gltf, data:Data_AnimationSampler){
  const sampler = new AnimationSampler();
  sampler.parse( gltf, data );
  return sampler;
}


function createChannel(gltf:Gltf, data:Data_AnimationChannel, animation:Animation ){
  const channel = new AnimationChannel();
  channel.parse( gltf, data, animation );
  return channel;
}


export default class Animation extends BaseElement {

  static TYPE = ElementType.ANIMATION;

  samplers : AnimationSampler[]
  channels : AnimationChannel[]

  parse(gltf : Gltf, data : Data_Animation) {

    super.parse(gltf, data);

    this.samplers = data.samplers.map(
      d => createSampler(gltf, d)
    );
    
    this.gltf.addElements(this.samplers);

    this.channels = data.channels.map(
      d => createChannel(gltf, d, this)
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
