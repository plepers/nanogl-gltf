
/**
 * @typedef {import("./Accessor").default} Accessor
 * @typedef {import("./Animation").default} Animation
 * @typedef {import("../index").default} Gltf
 */



import BaseElement from './BaseElement';
import { TYPE_ANIMATION_SAMPLER, TYPE_ACCESSOR } from '../consts';
import Ref from '../Ref';
import { quat } from 'gl-matrix';


const MODE_LINEAR = 'LINEAR';
const MODE_STEP = 'STEP';
const MODE_CUBICSPLINE = 'CUBICSPLINE';



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

  constructor(input) {
    this.frame = 0;
    this.t0 = input.getRawScalar(0);
    this.t1 = input.getRawScalar(1);
    this.inBound = true;
    this._fMax = input.count-1;
  }

  /**
   * return -1 if t before interval, 1 if after , 0 if inside
   * @param {number} t 
   */
  contain(t) {
    if (t < this.t0) return -1
    if (t >= this.t1) return 1;
    return 0;
  }


  normalizedFrame(){
    return Math.min( Math.max( this.frame, 0 ) , this._fMax );
  }


}



class Interpolator {

  /**
   * @param {AnimationSampler} sampler 
   */
  constructor(sampler) {
    this.sampler = sampler;
    this.interval = new SampleInterval(sampler.input);
  }


  resolveInterval(t) {

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


  evaluate(out, t) {
    //abstract
  }


}


class StepInterpolator extends Interpolator {

  evaluate(out, t) {
    this.resolveInterval(t);
    this.sampler.output.getValue(out, this.interval.normalizedFrame());
  }

}




function LERP_N(out, a, b, p) {
  const n = a.length;
  const invp = 1.0 - p;
  for (var i = 0; i < n; i++) {
    out[i] = a[i] * invp + b[i] * p;
  }
}

function LERP1(out, a, b, p) {
  out[0] = a[0] * (1.0 - p) + b[0] * p;
}

function getLerpFunction(numComps) {
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

  constructor(sampler) {
    super(sampler);
    this.val0 = sampler.output.createElementHolder();
    this.val1 = sampler.output.createElementHolder();
    this.lerpFunc = getLerpFunction(this.val0.length);
  }

  evaluate(out, t) {
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

  constructor(sampler) {
    super(sampler);
    this.val0 = sampler.output.createElementHolder();
    this.val1 = sampler.output.createElementHolder();
    this.val2 = sampler.output.createElementHolder();
    this.val3 = sampler.output.createElementHolder();

    this.assumeQuat = (this.val0.length === 4);
  }

  evaluate(out, t) {
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
        quat.normalize(out, out);
      }


    } else {
      output.getValue(out, this.interval.normalizedFrame() * 3 + 1);
    }
  }

}





function InterpolatorFactory(sampler) {
  switch (sampler.interpolation) {
    case MODE_STEP:
      return new StepInterpolator(sampler);
    case MODE_LINEAR:
      return new LinearInterpolator(sampler);
    case MODE_CUBICSPLINE:
      return new CubicSplineInterpolator(sampler);

    default:
      throw new Error('GLTF : Unsupported sampler interpolation ' + sampler.interpolation);
  }
}







export default class AnimationSampler extends BaseElement {

  static TYPE = TYPE_ANIMATION_SAMPLER

  /**
   * 
   * @param {Gltf} gltf 
   * @param {any} data 
   * @param {Animation} animation 
   */
  constructor(gltf, data, animation) {
    super(gltf, data);

    this.animation = animation;

    this.interpolation = data.interpolation || MODE_LINEAR;

    /**
     * @type {Accessor}
     * @description sampler input accessor
     */
    this.input = this.gltf.getElement( TYPE_ACCESSOR, data.input );

    /**
     * @type {Accessor}
     * @description sampler output accessor
     */
    this.output = this.gltf.getElement( TYPE_ACCESSOR, data.output );

    this.interpolator = InterpolatorFactory( this );
  }


  createElementHolder() {
    return this.output.createElementHolder();
  }


  getValueAtTime(out, t) {

    this.interpolator.evaluate( out, t );

  }

}
