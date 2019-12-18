


import BaseElement from './BaseElement';
import { ElementType } from '../consts';


import Gltf from '../index'
import Animation from './Animation'
import AnimationSampler from './AnimationSampler'
import Node from './Node'
import {TypedArray} from '../consts'
import { Data_AnimationChannel } from '../schema/glTF';

type applyFunc = (node:Node, value:TypedArray)=>void



enum Path {
  TRANSLATION = 'translation',
  ROTATION    = 'rotation'   ,
  SCALE       = 'scale'      ,
  WEIGHTS     = 'weights'    ,
}

type PathType = 'translation' | 'rotation' | 'scale' | 'weights' | string;


function applyTranslation(node:Node, value:TypedArray) {
  node.position.set( value );
  node.invalidate();
}

function applyRotation(node:Node, value:TypedArray) {
  node.rotation.set( value );
  node.invalidate();
}

function applyScale(node:Node, value:TypedArray) {
  node.scale.set( value );
  node.invalidate();
}

function applyWeights(node:Node, value:TypedArray) {
  node.weights.set( value );
}


function getApplyFunctionFromPath(path:PathType):applyFunc {
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
  sampler       : AnimationSampler;
  path          : PathType        ;
  applyFunction : applyFunc       ;
  node          : Node            ;
  valueHolder   : TypedArray      ;


  parse(gltf : Gltf, data:Data_AnimationChannel, animation:Animation) {

    super.parse(gltf, data);

    this._active = false;

    this.path = data.target.path;
    this.applyFunction = getApplyFunctionFromPath( this.path );
    
    if( data.target.node !== undefined ){
      this._active = true;
      this.node = gltf.getElement<Node>( ElementType.NODE, data.target.node);
    }
    
    this.sampler = animation.getSampler(data.sampler);
    this.valueHolder = this.sampler.createElementHolder();
  }


  evaluate(t:number) {
    if (this._active) {
      this.sampler.evaluate(this.valueHolder, t);
      this.applyFunction( this.node, this.valueHolder );
    }
  }


}
