import Program from "nanogl/program";
import Chunk from "nanogl-pbr/Chunk";
import ChunksSlots from "nanogl-pbr/ChunksSlots";

import glsl from './skin-deformer.glsl'
import { mat4 } from "gl-matrix";


const COMPS = ['x','y','z','w'] as const;
const JOINTS_UNIFORM = 'uJoints'

export type SkinAttributeSet = {
  weightsAttrib : string;
  jointsAttrib  : string;
  numComponents : 1|2|3|4;
}

function getAttribTypeForSize( n:1|2|3|4 ) : string {
  return n===1 ? 'float' : `vec${n}`
}


/**
 * Create glsl string to declare WEIGHT_N and JOINTS_N attributes
 */
function createAttributeDeclarations( sets : SkinAttributeSet[] ){
  let res = ''
  for (const set of sets) {
    const type = getAttribTypeForSize( set.numComponents );
    res += `
IN ${type} ${set.jointsAttrib}; 
IN ${type} ${set.weightsAttrib};`
  }
  return res;
}




function makeComputeMatrixSum( sets : SkinAttributeSet[], jointsUniform : string = 'uJoints' ) {
  const joints : string[] = []
  for (const set of sets) {
    const numcomps = set.numComponents;
    for (let i = 0; i < numcomps; i++) {
      const swizzle = (numcomps===1)?'':'.'+COMPS[i]
      const aJoint  = set.jointsAttrib+swizzle;
      const aWeight = set.weightsAttrib+swizzle;
      joints.push( `${jointsUniform}[int(${aJoint})] * ${aWeight}` );
    }
  }
  return joints.join('+ \n  ');
}



export default class SkinDeformer extends Chunk {

  _attributeSets : SkinAttributeSet[];
  _numJoints : number;

 
  private _jointsBuffer   : Float32Array;
  private _jointMatrices : mat4[];

  constructor( ){
    super( true, true );
  }


  set numJoints( n : number ){
    this._numJoints = n;
    this._createJointsBuffer();
    this.invalidateCode();
  }

  get numJoints(){
    return this._numJoints;
  }

  get jointMatrices(){
    return this._jointMatrices;
  }

  setAttributeSet( sets : SkinAttributeSet[] ){
    this._attributeSets = sets;
    this.invalidateCode();
  }

  setup(prg: Program): void{
    prg[JOINTS_UNIFORM]( this._jointsBuffer )
  }


  private _createJointsBuffer(){
    this._jointsBuffer = new Float32Array(this._numJoints * 16 );
    this._jointMatrices = [];
    const buff = this._jointsBuffer.buffer;
    for (let index = 0; index < this._numJoints; index++) {
      this._jointMatrices.push( <mat4>new Float32Array(buff, index*16*4, 16));
    }
  }


  protected _genCode(slots: ChunksSlots ): void {

    const numJoints  = this._numJoints
    const attribDecl = createAttributeDeclarations( this._attributeSets );
    const matrixSum = makeComputeMatrixSum( this._attributeSets, JOINTS_UNIFORM );

    slots.add('pv'         , glsl({ pv: true, attribDecl, matrixSum, numJoints }));
    slots.add('vertex_warp', glsl({ vertex_warp: true }));
    
  }

  

  protected _getHash(): string {
    let hash = ''
    for (const set of this._attributeSets) {
      hash += set.jointsAttrib+set.weightsAttrib+set.numComponents
    }
    hash+=this._numJoints
    return hash;
  }


  
}