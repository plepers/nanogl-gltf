
import AnimationSampler, { SamplerEvaluator } from './AnimationSampler'
import Node from './Node'
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';
import { TypedArray } from '../types/TypedArray';

export type applyFunc = (node:Node, value:TypedArray)=>void





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
    case Gltf2.AnimationChannelTargetPath.TRANSLATION:
      return applyTranslation;
    case Gltf2.AnimationChannelTargetPath.ROTATION:
      return applyRotation;
    case Gltf2.AnimationChannelTargetPath.SCALE:
      return applyScale;
    case Gltf2.AnimationChannelTargetPath.WEIGHTS:
      return applyWeights;
    default:
      throw new Error('unsupported path ' + path);
  }
}


/**
 * The AnimationChannel element contains the data to animate a node property.
 */
export default class AnimationChannel implements IElement {

  readonly gltftype : GltfTypes.ANIMATION_CHANNEL = GltfTypes.ANIMATION_CHANNEL
  name        : undefined | string;
  extras      : any   ;

  /**
   * Whether the channel is active or not
   */
  _active       : boolean         ;

  /**
   * Linked AnimationSampler
   */
  sampler       : AnimationSampler;

  /**
   * Node's property to animate (TRASLATION, ROTATION, SCALE or WEIGHTS)
   */
  path          : Gltf2.AnimationChannelTargetPath        ;

  /**
   * Function to apply the animation value to the corresponding node property
   * (and manage node invalidation for translation, rotation and scale animation)
   */
  applyFunction : applyFunc       ;

  /**
   * Node to animate
   */
  node          : Node            ;

  /**
   * TypedArray to store the animation value at each re-evaluate
   */
  valueHolder   : TypedArray      ;

  /**
   * SamplerEvaluator to use to evaluate the animation value at a given time
   */
  evaluator     : SamplerEvaluator;


  /**
   * Parse the AnimationChannel data, create the SamplerEvaluator and the valueHolder.
   * 
   * Is async as it needs to wait for the target Node to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse(gltfLoader:GltfLoader, data:Gltf2.IAnimationChannel) : Promise<any> {

    this._active = false;

    this.path = data.target.path;
    this.applyFunction = getApplyFunctionFromPath( this.path );
    
    if( data.target.node !== undefined ){
      this._active = true;
      this.node = await gltfLoader.getElement( GltfTypes.NODE, data.target.node);
      
      
      let numElems = 1;
      if( this.path === Gltf2.AnimationChannelTargetPath.WEIGHTS ){
        numElems = this.node.mesh.primitives[0].targets.length
      }
      
      gltfLoader._loadElement( data.elementParent ).then( animation=>{
        this.sampler = animation.getSampler(data.sampler);
        this.evaluator = this.sampler.createEvaluator( this.path, numElems )
        this.valueHolder = this.evaluator.createElementHolder();
      } );

    }

  }

  /**
   * Evaluate the animation at a given time, and apply the animation value to the corresponding node property,
   * with the corresponding interpolation function.
   * @param t Time to evaluate the animation at
   */
  evaluate(t:number) {
    if (this._active) {
      this.evaluator.evaluate(this.valueHolder, t);
      this.applyFunction( this.node, this.valueHolder );
    }
  }

}
