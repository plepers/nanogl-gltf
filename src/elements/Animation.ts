

import AnimationChannel from './AnimationChannel';
import AnimationSampler from './AnimationSampler';

import Gltf2 from '../types/Gltf2'
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';
import { GLContext } from 'nanogl/types';


/**
 * The Animation element contains the data to animate a node, linking with samplers and channels.
 */
export default class Animation implements IElement {

  readonly gltftype : GltfTypes.ANIMATION = GltfTypes.ANIMATION;
  name        : undefined | string;
  extras      : any   ;

  /**
   * Array of samplers used to sample the animation values and keyframes
   */
  samplers : AnimationSampler[];

  /**
   * Array of channels used to animate the nodes
   */
  channels : AnimationChannel[];

  /**
   * Duration of the animation
   */
  duration  = 0

  
  /**
   * Parse the Animation data, creates the samplers and channels.
   * 
   * Is async as it needs to wait for all the samplers and channels to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse(gltfLoader:GltfLoader, data : Gltf2.IAnimation) : Promise<any> {

    const samplerPromises = data.samplers.map( (data)=>gltfLoader._loadElement(data) );
    this.samplers = await Promise.all( samplerPromises );

    for (const sampler of this.samplers) {
      this.duration = Math.max( sampler.maxTime, this.duration );
    }

    const channelPromises = data.channels.map( (data)=>gltfLoader._loadElement(data) );
    this.channels = await Promise.all( channelPromises );
    
  }

  /**
   * Evaluate the animation at a given time, updating the nodes properties.
   * It evaluates each channel, which in turn evaluates the sampler and apply the value to the node.
   * @param t Time to evaluate the animation at
   */
  evaluate( t :number ){
    for (const channel of this.channels ) {
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
