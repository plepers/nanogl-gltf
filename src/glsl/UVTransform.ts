
import Chunk from 'nanogl-pbr/Chunk'
import Input, { Uniform } from 'nanogl-pbr/Input'


import mat2 from 'gl-matrix/src/gl-matrix/mat2'

import code from './uvTransform.glsl'
import { vec2 } from 'gl-matrix';
import ChunkSlots from 'nanogl-pbr/ChunksSlots';


export default class UVTransform extends Chunk {

  readonly attrib: string;
  readonly varying: string;

  _defineAttrib: boolean;
  _scale: Float32Array;
  _rotation: number;

  _translateInput: Input;
  _translateParam: Uniform;
  _translateValue: Float32Array;

  _pivotInput: Input;
  _pivotParam: Uniform;
  _pivotValue: Float32Array;

  _transformInput: Input;
  _transformParam: Uniform;
  _transformValue: Float32Array;



  constructor(attrib: string = 'aTexCoord0', varying: string = 'vTexCoord0') {

    super(true, false);

    this.attrib = attrib;
    this.varying = varying;

    this._defineAttrib = true

    this._scale = new Float32Array([1, 1]);
    this._rotation = 0;


    this._translateInput = this.addChild(new Input('translate_' + varying, 2, Input.VERTEX));
    this._translateParam = new Uniform('uTranslate_' + varying, 2);
    this._translateValue = this._translateParam._value;


    this._pivotInput = this.addChild(new Input('pivot_' + varying, 2, Input.VERTEX));
    this._pivotParam = new Uniform('uPivot_' + varying, 2);
    this._pivotValue = this._pivotParam._value;


    this._transformInput = this.addChild(new Input('transform_' + varying, 4, Input.VERTEX));
    this._transformParam = new Uniform('uTransform_' + varying, 4);
    this._transformValue = this._transformParam._value;

  }




  token() {
    return this.varying;
  }


  scale(x:number, y:number = x) : this {
    this._scale[0] = x;
    this._scale[1] = y;
    this.updateTransformMatrix();
    return this;
  }


  rotate(rad : number) : this {
    this._rotation = rad;
    this.updateTransformMatrix();
    return this;
  }


  pivot(x:number, y:number) : this {

    if (x !== 0 || y !== 0) {
      this._pivotValue[0] = x;
      this._pivotValue[1] = y;
      this._pivotInput.attach(this._pivotParam);
    } else {
      this._pivotInput.detach();
    }

    return this;
  }


  translate(x:number, y:number) : this {

    if (x !== 0 || y !== 0) {
      this._translateValue[0] = x;
      this._translateValue[1] = y;
      this._translateInput.attach(this._translateParam);
    } else {
      this._translateInput.detach();
    }

    return this;
  }





  updateTransformMatrix() {

    var hasXform = !(this._rotation === 0 && this._scale[0] === 1 && this._scale[1] === 1);

    if (hasXform) {
      mat2.fromScaling(this._transformValue as mat2, this._scale as vec2);
      mat2.rotate(this._transformValue as mat2, this._transformValue as mat2, this._rotation);
      this._transformInput.attach(this._transformParam);
    }
    else this._transformInput.detach();

  }

  
  protected _genCode(slots: ChunkSlots ): void {
    slots.add('pv', code({ pv: true, mod: this }));
    slots.add('pf', code({ pf: true, mod: this }));
    slots.add('v' , code({ v: true, mod: this }));
  }

  protected _getHash(): string {
    return '';
  }


}



