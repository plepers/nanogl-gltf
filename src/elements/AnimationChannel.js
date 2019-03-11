//@flow


import BaseElement from './BaseElement';
import { TYPE_ANIMATION_CHANNEL, TYPE_NODE } from '../consts';
import Ref from '../Ref';


import type Gltf from '../index'
import type Animation from './Animation'
import type AnimationSampler from './AnimationSampler'
import type Node from './Node'
import type {TypedArray} from '../consts'

type applyFunc = (node:any, value:any)=>void


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

  _active   : boolean         ;
  animation : Animation       ;
  sampler   : AnimationSampler;
  path      : string          ;
  applyFunction: applyFunc;
  node      : ?Node;
  valueHolder : TypedArray;

  constructor(gltf : Gltf, data:any, animation:Animation) {

    super(gltf, data);

    this._active = false;

    this.animation = animation;
    this.sampler = animation.getSampler(data.sampler);
    this.path = data.target.path;
    this.applyFunction = getApplyFunctionFromPath( this.path );


    if( data.target.node !== undefined ){
      this._active = true;
      this.node = gltf.getElement<Node>( TYPE_NODE, data.target.node);
    }

    this.valueHolder = this.sampler.createElementHolder();
  }
  
 


  update(t:number) {
    if (this._active) {
      this.sampler.evaluate(this.valueHolder, t);
      this.applyFunction( this.node, this.valueHolder );
    }
  }


}
