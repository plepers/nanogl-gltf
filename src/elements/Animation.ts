//@flow

import BaseElement from './BaseElement';
import { ElementType } from '../consts';
import AnimationChannel from './AnimationChannel';
import AnimationSampler from './AnimationSampler';

import Gltf from '../index'

export default class Animation extends BaseElement {

  static TYPE = ElementType.ANIMATION;

  samplers : AnimationSampler[]
  channels : AnimationChannel[]

  constructor(gltf : Gltf, data : any) {

    super(gltf, data);

    this.samplers = data.samplers.map(
      d => new AnimationSampler(gltf, d, this)
    );
    
    this.gltf.addElements(this.samplers);

    this.channels = data.channels.map(
      d => new AnimationChannel(gltf, d, this)
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
