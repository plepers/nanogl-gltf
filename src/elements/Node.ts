//@flow

import { ElementType } from '../consts';
import BaseElement from './BaseElement';
import NGLNode from 'nanogl-node'


import  Gltf   from '../index';
import  Skin   from './Skin'  ;
import  Camera from './Camera';
import  Mesh   from './Mesh'  ;



export default class Node extends NGLNode implements BaseElement {


  static TYPE = ElementType.NODE;


  gltf       : Gltf  ;
  name       : string;
  extras     : any   ;
  extensions : any   ;

  camera      : Camera;
  skin        : Skin;
  mesh        : Mesh;
  childRefs   : number[];
  skinRef     : number;
  weights     : Float32Array;

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
  add        : (n:NGLNode)=>void;


  constructor( gltf: Gltf, data: any ){

    super();

    this.gltf       = gltf;
    this.name       = data.name      
    this.extras     = data.extras    
    this.extensions = data.extensions
    this.childRefs  = data.children || [];
    this.skinRef    = data.skin;

    if( data.camera !== undefined )
      this.camera = this.gltf.getElement( ElementType.CAMERA, data.camera );

    if( data.matrix !== undefined )
      this.setMatrix( data.matrix );

    if( data.scale !== undefined )
      this.scale.set( data.scale );

    if( data.translation !== undefined )
      this.position.set( data.translation );

    if( data.rotation !== undefined )
      this.rotation.set( data.rotation );

    if( data.weights !== undefined )
      this.weights = new Float32Array( data.weights );

    if( data.mesh !== undefined )
      this.mesh = gltf.getElement( ElementType.MESH, data.mesh );

    this.invalidate();
    
  }


  get elementType() : ElementType {
    return this.constructor['TYPE'];
  }

  
  // set weights( weights ){
  //   this.mesh.weights.set( weights );
  // }

  // get weights( ){
  //   return this.mesh.weights;
  // }

  resolveReferences(){

    for (var i of this.childRefs) {
      this.add( this.gltf.getElement(ElementType.NODE, i ) );
    }

    if( this.skinRef !== undefined )
      this.skin = this.gltf.getElement( ElementType.SKIN, this.skinRef )

  }
  

}


