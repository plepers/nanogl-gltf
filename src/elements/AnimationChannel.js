//@ts-check

/**
 * @typedef {import("../index").default} Gltf
 * @typedef {import("./Animation").default} Animation
 */

import BaseElement from './BaseElement';
import { TYPE_ANIMATION_CHANNEL, TYPE_NODE } from '../consts';
import Ref from '../Ref';







const PATH_TRANSLATION = 'translation';
const PATH_ROTATION    = 'rotation'   ;
const PATH_SCALE       = 'scale'      ;
const PATH_WEIGHTS     = 'weights'    ;


function applyTranslation(node, value) {
  
}

function applyRotation(node, value) {

}

function applyScale(node, value) {

}

function applyWeights(node, value) {

}


function getApplyFunctionFromPath(path) {
  switch (path) {
    case PATH_TRANSLATION:
      return applyTranslation;
    case PATH_ROTATION:
      return applyRotation;
    case PATH_SCALE:
      return applyScale;
    case PATH_WEIGHTS:
      return applyWeights;
    default:
      throw new Error('unsupported path ' + path);
  }
}


export default class AnimationChannel extends BaseElement {

  static TYPE = TYPE_ANIMATION_CHANNEL

  /**
   * 
   * @param {Gltf} gltf 
   * @param {any} data 
   * @param {Animation} animation 
   */
  constructor(gltf, data, animation) {

    super(gltf, data);

    this._active = false;

    this.animation = animation;
    this.sampler = animation.getSampler(data.sampler);
    this.path = data.target.path;
    this.applyFunction = getApplyFunctionFromPath( this.path );

    if (data.node !== undefined) {
      this._active = true;
      this.$node = new Ref(gltf, TYPE_NODE, data.target.node);
    }

    this.node = null;
    this.valueHolder = null;
  }
  
  
  resolveReferences() {
    if (this._active)
      this.node = this.$node.resolve();

    // TODO: ensure sampler is resolved here
    this.valueHolder = this.sampler.createElementHolder();
  }


  update(t) {
    if (this._active) {
      this.sampler.getValueAtTime(this.valueHolder, t);
      this.applyFunction( this.node, this.valueHolder );
    }
  }


}
