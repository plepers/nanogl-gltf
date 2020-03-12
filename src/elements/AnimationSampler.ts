


import BaseElement from './BaseElement';

import { quat } from 'gl-matrix';


import Gltf from '../index'
import Accessor from './Accessor'
import Animation from './Animation'
import {TypedArray} from '../consts'
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';

type LerpFunc = (out:TypedArray, a:TypedArray, b:TypedArray, p:number )=>void;





function cubicSplineInterpolation(out, t, dt, v0, b0, a1, v1) {

  const t2 = t * t;
  const t3 = t * t2;

  const f0 = 2.0 * t3 - 3.0 * t2 + 1.0;
  const f1 = dt * (t3 - 2.0 * t2 + t);
  const f2 = 3.0 * t2 - 2.0 * t3;
  const f3 = dt * (t3 - t2);

  const ncomps = v0.length;

  for (var i = 0; i < ncomps; i++) {
    out[i] = f0 * v0[i] + f1 * b0[i] + f2 * v1[i] + f3 * a1[i];
  }

}



class SampleInterval {


  frame   : number;
  t0      : number;
  t1      : number;
  inBound : boolean;
  _fMax   : number;


  constructor(input:Accessor) {
    this.frame = 0;
    this.t0 = input.getRawScalar(0);
    this.t1 = input.getRawScalar(1);
    this.inBound = true;
    this._fMax = input.count-1;
  }


  contain(t:number):number {
    if (t < this.t0) return -1
    if (t >= this.t1) return 1;
    return 0;
  }


  normalizedFrame():number{
    return Math.min( Math.max( this.frame, 0 ) , this._fMax );
  }


}



class Interpolator {


  sampler : AnimationSampler;
  interval: SampleInterval  ;


  constructor(sampler:AnimationSampler) {
    this.sampler = sampler;
    this.interval = new SampleInterval(sampler.input);
  }


  resolveInterval(t:number) {

    const interval = this.interval;
    const input = this.sampler.input;
    const numFrames = input.count;

    const contain = interval.contain(t);

    // the current interval already contain t
    if (contain === 0) return;



    let frame;
    let t1;
    let t0;
    let inBound = true;


    if (contain > 0) {

      frame = interval.frame + 1;
      t1 = interval.t1;

      do {
        frame++;
        inBound = (frame < numFrames);
        t0 = t1;
        t1 = inBound ? input.getRawScalar(frame) : Number.MAX_VALUE;
      } while (t1 <= t );

      frame--;

    }
    else {

      frame = interval.frame;
      t0 = interval.t0;

      do {
        frame--;
        inBound = (frame >= 0);
        t1 = t0;
        t0 = inBound ? input.getRawScalar(frame) : -Number.MAX_VALUE;
      } while (t0 > t );

    }

    interval.frame = frame
    interval.t0 = t0
    interval.t1 = t1
    interval.inBound = inBound;


  }


  evaluate(out:TypedArray, t:number) {
    //abstract
  }


}


class StepInterpolator extends Interpolator {

  evaluate(out:TypedArray, t:number) {
    this.resolveInterval(t);
    this.sampler.output.getValue(out, this.interval.normalizedFrame());
  }

}




function LERP_N(out:TypedArray, a:TypedArray, b:TypedArray, p:number ){
  const n = a.length;
  const invp = 1.0 - p;
  for (var i = 0; i < n; i++) {
    out[i] = a[i] * invp + b[i] * p;
  }
}

function LERP1( out:TypedArray, a:TypedArray, b:TypedArray, p:number ){
  out[0] = a[0] * (1.0 - p) + b[0] * p;
}

function getLerpFunction( numComps : number ) : LerpFunc {
  switch (numComps) {
    case 1:
      return LERP1
    case 4:
      return quat.slerp;
    default:
      return LERP_N;
  }
}




class LinearInterpolator extends Interpolator {

  val0 : TypedArray;
  val1 : TypedArray;
  lerpFunc : LerpFunc;

  constructor(sampler : AnimationSampler) {
    super(sampler);
    this.val0 = sampler.output.createElementHolder();
    this.val1 = sampler.output.createElementHolder();
    this.lerpFunc = getLerpFunction(this.val0.length);
  }

  evaluate(out:TypedArray, t:number) {
    this.resolveInterval(t);

    const output = this.sampler.output;

    if (this.interval.inBound) {
      const { t0, t1, frame } = this.interval;
      const p = (t - t0) / (t1 - t0);

      output.getValue(this.val0, frame + 0);
      output.getValue(this.val1, frame + 1);
      this.lerpFunc(out, this.val0, this.val1, p);

    } else {
      output.getValue(out, this.interval.normalizedFrame());
    }
  }

}



// https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation

class CubicSplineInterpolator extends Interpolator {


  val0 : TypedArray;
  val1 : TypedArray;
  val2 : TypedArray;
  val3 : TypedArray;

  assumeQuat : boolean;

  constructor(sampler : AnimationSampler) {
    super(sampler);
    this.val0 = sampler.output.createElementHolder();
    this.val1 = sampler.output.createElementHolder();
    this.val2 = sampler.output.createElementHolder();
    this.val3 = sampler.output.createElementHolder();

    this.assumeQuat = (this.val0.length === 4);
  }

  evaluate(out:TypedArray, t:number) {
    this.resolveInterval(t);

    const output = this.sampler.output;

    if (this.interval.inBound) {

      const { t0, t1, frame } = this.interval;
      const dt = t1 - t0
      const p = (t - t0) / dt;

      output.getValue(this.val0, frame * 3 + 1);
      output.getValue(this.val1, frame * 3 + 2);
      output.getValue(this.val2, frame * 3 + 3);
      output.getValue(this.val3, frame * 3 + 4);


      cubicSplineInterpolation(out, p, dt, this.val0, this.val1, this.val2, this.val3);

      if (this.assumeQuat) {
        quat.normalize(<quat>out, <quat>out);
      }


    } else {
      output.getValue(out, this.interval.normalizedFrame() * 3 + 1);
    }
  }

}





function InterpolatorFactory(sampler:AnimationSampler) : Interpolator {
  switch (sampler.interpolation) {
    case Gltf2.AnimationSamplerInterpolation.STEP:
      return new StepInterpolator(sampler);
    case Gltf2.AnimationSamplerInterpolation.LINEAR:
      return new LinearInterpolator(sampler);
    case Gltf2.AnimationSamplerInterpolation.CUBICSPLINE:
      return new CubicSplineInterpolator(sampler);

    default:
      throw new Error('GLTF : Unsupported sampler interpolation ' + sampler.interpolation);
  }
}







export default class AnimationSampler extends BaseElement {

  readonly gltftype : GltfTypes.ANIMATION_SAMPLER = GltfTypes.ANIMATION_SAMPLER


  interpolation :Gltf2.AnimationSamplerInterpolation ;
  input         :Accessor          ;
  output        :Accessor          ;
  interpolator  :Interpolator      ;


  parse( gltfLoader:GltfLoader, data:Gltf2.IAnimationSampler ) {
    super.parse( gltfLoader, data );


    this.input = this.gltf.getElement( GltfTypes.ACCESSOR, data.input );
    this.output = this.gltf.getElement( GltfTypes.ACCESSOR, data.output );

    this.interpolation = data.interpolation || Gltf2.AnimationSamplerInterpolation.LINEAR;
    this.interpolator  = InterpolatorFactory( this );
  }


  createElementHolder():TypedArray {
    return this.output.createElementHolder();
  }


  evaluate(out:TypedArray, t:number) {
    this.interpolator.evaluate( out, t );
  }

}
