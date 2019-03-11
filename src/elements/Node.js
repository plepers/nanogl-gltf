//@flow

import { TYPE_NODE, TYPE_CAMERA } from '../consts';
import { BaseElementExtend } from './BaseElement';
import NGLNode from 'nanogl-node'


import type Gltf   from '../index';
import type Skin   from './skin'  ;
import type Camera from './camera';
import type Mesh   from './mesh'  ;



export default class Node extends BaseElementExtend(NGLNode) {


  static TYPE = TYPE_NODE;

  camera      : ?Camera;
  skin        : ?Skin;
  mesh        : Mesh;
  weights     : number[];

  // ngl
  rotation   : Float32Array;
  scale      : Float32Array;
  position   : Float32Array;
  _matrix    : Float32Array;
  _wmatrix   : Float32Array;
  _wposition : Float32Array;
  _parent    : Node        ;
  _children  : Node[]      ;


  setMatrix  : (m:Float32Array)=>void;
  invalidate : ()=>void


  constructor( gltf: Gltf, data: any ){

    super( gltf, data );

    if( data.camera !== undefined )
      this.camera = this.gltf.getElement( TYPE_CAMERA, data.camera );

    if( data.matrix )
      this.setMatrix( data.matrix );

    if( data.scale )
      this.scale.set( data.scale );

    if( data.translation )
      this.position.set( data.translation );

    if( data.rotation )
      this.rotation.set( data.rotation );

    if( data.weights )
      this.weights = data.weights;

    this.invalidate();
    
  }


  resolveReferences(){

  }
  

}


