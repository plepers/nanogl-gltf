//@ts-check

import BaseElement from './BaseElement';
import { TYPE_ANIMATION } from '../consts';
import AnimationChannel from './AnimationChannel';
import AnimationSampler from './AnimationSampler';

export default class Animation extends BaseElement {

  static TYPE = TYPE_ANIMATION;

  constructor(gltf, data) {

    super(gltf, data);

    /**
     * @type {Array<AnimationSampler>}
     */
    this.samplers = null;

    /**
     * @type {Array<AnimationChannel>}
     */
    this.channels = null;



    this.samplers = data.samplers.map(
      d => new AnimationSampler(gltf, d, this)
    );
    
    this.gltf.addElements(this.samplers);

    this.channels = data.channels.map(
      d => new AnimationChannel(gltf, d, this)
    );
    
    this.gltf.addElements(this.channels);

  }




  /**
   * 
   * @param {number} i
   * @returns {AnimationChannel} 
   */
  getChannel(i) {
    return this.channels[i];
  }

  /**
   * 
   * @param {number} i
   * @returns {AnimationSampler} 
   */
  getSampler(i) {
    return this.samplers[i];
  }

}
