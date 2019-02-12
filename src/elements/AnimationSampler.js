
import BaseElement from './BaseElement';
import { TYPE_ANIMATION_SAMPLER, TYPE_ACCESSOR } from '../consts';
import Ref from '../Ref';


const MODE_LINEAR        = 'LINEAR';
const MODE_STEP          = 'STEP';
const MODE_CUBICSPLINE   = 'CUBICSPLINE';

const TIME = new Float32Array(1);

export default class AnimationSampler extends BaseElement {

  static TYPE = TYPE_ANIMATION_SAMPLER

  constructor( gltf, data, animation ){
    super( gltf, data );

    this.animation = animation;

    this.interpolation = data.interpolation || MODE_LINEAR;

    this.$input  = new Ref( gltf, TYPE_ACCESSOR, data.input );
    this.$output = new Ref( gltf, TYPE_ACCESSOR, data.output );

    /**
     * @type {Accessor}
     * @description sampler input accessor
     */
    this.input  = null;


    /**
     * @type {Accessor}
     * @description sampler output accessor
     */
    this.output = null;

  }


  resolveReferences(){
    // VALIDATION  : input componentType must be FLOAT
    // VALIDATION  : input must have min max
    this.input  = this.$input .resolve(); 
    this.output = this.$output.resolve();
  }


  createElementHolder(){
    return this.output.createElementHolder();
  }


  getValueAtTime( out, t ){


    // get index for T
    const min = this.input.min[0];
    const max = this.input.max[0];
    const fcount = this.input.count;

    let index;
    
    if( t >= max ) {
      this.output.getValue( out, fcount-1 );
    }else if( t <= min ){
      this.output.getValue( out, 0);
    }
    else 
    {
      // guess frame index base of min max input times
      index = Math.floor( (t-min)/(max-min)*(fcount-1) )
      
      //              i  t
      // t0    t1    t2     t3    t4

      this.input.getRawValue( TIME, index )

      if( TIME[0] >= t ){
        // overshoot index, decr
        while(TIME[0] > t && index >= 0 ){
          index--;
          this.input.getRawValue( TIME, index );
        }
      } else {
        while(TIME[0] < t && index < fcount ){
          index++;
          this.input.getRawValue( TIME, index );
        }
        index--;
      }


      this.output.getValue( out, index );

    }

    
  }

}
