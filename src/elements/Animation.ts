

import BaseElement from './BaseElement';
import AnimationChannel from './AnimationChannel';
import AnimationSampler from './AnimationSampler';

import Gltf2 from '../types/Gltf2'
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';




export default class Animation extends BaseElement {

  readonly gltftype : GltfTypes.ANIMATION = GltfTypes.ANIMATION;

  samplers : AnimationSampler[];
  channels : AnimationChannel[]


  async parse(gltfLoader:GltfLoader, data : Gltf2.IAnimation) : Promise<any> {

    super.parse(gltfLoader, data);

    const samplerPromises = data.samplers.map( (data)=>gltfLoader._loadElement(data) );
    this.samplers = await Promise.all( samplerPromises );

    const channelPromises = data.channels.map( (data)=>gltfLoader._loadElement(data) );
    this.channels = await Promise.all( channelPromises );
    
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
