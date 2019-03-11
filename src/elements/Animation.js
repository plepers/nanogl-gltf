//@flow

import BaseElement from './BaseElement';
import { TYPE_ANIMATION } from '../consts';
import AnimationChannel from './AnimationChannel';
import AnimationSampler from './AnimationSampler';

import type Gltf from '../index'

export default class Animation extends BaseElement {

  static TYPE = TYPE_ANIMATION;

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


  update( t :number ){
    for (var channel of this.channels ) {
      channel.update( t );
    }
  }



  /**
   * 
   * @param {number} i
   * @returns {AnimationChannel} 
   */
  getChannel(i:number) {
    return this.channels[i];
  }

  /**
   * 
   * @param {number} i
   * @returns {AnimationSampler} 
   */
  getSampler(i:number) {
    return this.samplers[i];
  }

}
