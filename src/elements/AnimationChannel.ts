//@flow


import BaseElement from './BaseElement';
import { ElementType } from '../consts';


import Gltf from '../index'
import Animation from './Animation'
import AnimationSampler from './AnimationSampler'
import Node from './Node'
import {TypedArray} from '../consts'

type applyFunc = (node:Node, value:TypedArray)=>void

enum Path {
  TRANSLATION = 'translation',
  ROTATION    = 'rotation'   ,
  SCALE       = 'scale'      ,
  WEIGHTS     = 'weights'    ,
}



function applyTranslation(node:Node, value:TypedArray) {
  node.position.set( value );
}

function applyRotation(node:Node, value:TypedArray) {
  node.rotation.set( value );
}

function applyScale(node:Node, value:TypedArray) {
  node.scale.set( value );
}

function applyWeights(node:Node, value:TypedArray) {

}


function getApplyFunctionFromPath(path:Path):applyFunc {
  switch (path) {
    case Path.TRANSLATION:
      return applyTranslation;
    case Path.ROTATION:
      return applyRotation;
    case Path.SCALE:
      return applyScale;
    case Path.WEIGHTS:
      return applyWeights;
    default:
      throw new Error('unsupported path ' + path);
  }
}


export default class AnimationChannel extends BaseElement {

  static TYPE = ElementType.ANIMATION_CHANNEL

  _active       : boolean         ;
  animation     : Animation       ;
  sampler       : AnimationSampler;
  path          : Path            ;
  applyFunction : applyFunc       ;
  node          : Node            ;
  valueHolder   : TypedArray      ;


  constructor(gltf : Gltf, data:any, animation:Animation) {

    super(gltf, data);

    this._active = false;

    this.animation = animation;
    this.sampler = animation.getSampler(data.sampler);
    this.path = data.target.path;
    this.applyFunction = getApplyFunctionFromPath( this.path );

    if( data.target.node !== undefined ){
      this._active = true;
      this.node = gltf.getElement<Node>( ElementType.NODE, data.target.node);
    }

    this.valueHolder = this.sampler.createElementHolder();
  }
  
 


  evaluate(t:number) {
    if (this._active) {
      this.sampler.evaluate(this.valueHolder, t);
      this.applyFunction( this.node, this.valueHolder );
    }
  }


}
