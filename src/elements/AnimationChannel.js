//@ts-check

/**
 * @typedef {import("../index").default} Gltf
 * @typedef {import("./Animation").default} Animation
 */

import BaseElement from './BaseElement';
import { TYPE_ANIMATION_CHANNEL, TYPE_NODE } from '../consts';
import Ref from '../Ref';






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

    this._active = false;

    this.animation = animation;
    this.sampler   = animation.getSampler( data.sampler );
    this.path      = data.target.path;

    if( data.node !== undefined ){
      this._active = true;
      this.$node   = new Ref( gltf, TYPE_NODE, data.target.node );
    }

    this.node = null;

  }


  resolveReferences(){
    if( this._active )
      this.node = this.$node.resolve();
  }



}
