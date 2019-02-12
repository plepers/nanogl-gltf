
import BaseElement from './BaseElement';
import { TYPE_ANIMATION_CHANNEL, TYPE_NODE } from '../consts';
import Ref from '../Ref';

/**
 * @typedef {import("./Animation").default} Animation
 */





export default class AnimationChannel extends BaseElement {

  static TYPE = TYPE_ANIMATION_CHANNEL

  /**
   * 
   * @param {Gltf} gltf 
   * @param {any} data 
   * @param {Animation} animation 
   */
  constructor( gltf, data, animation ){
    super( gltf, data );

    this.animation = animation;

    this.sampler = animation.getSampler( data.sampler );

    this.path = data.target.path;

    if( data.node !== undefined ){
      this.$node   = new Ref( gltf, TYPE_NODE, data.target.node );
    }

    this.node = null;

    
  }

}
