

import { ElementType } from '../consts';
import BaseElement, { ElementMixin } from './BaseElement';
import NGLNode from 'nanogl-node'


import  Gltf   from '../index';
import  Skin   from './Skin'  ;
import  Camera from './Camera';
import  Mesh   from './Mesh'  ;
import { Data_Node } from '../schema/glTF';
import { mat4 } from 'gl-matrix';



export default class Node extends ElementMixin( NGLNode ) {


  static TYPE = ElementType.NODE;

  camera      : Camera;
  skin        : Skin;
  mesh        : Mesh;
  weights     : Float32Array;


  parse( gltf: Gltf, data: Data_Node ){

    // super.parse();

    this.uid        = BaseElement.CreateUID();
    this.gltf       = gltf;
    this.name       = data.name      
    this.extras     = data.extras    
    this.extensions = data.extensions

    if( data.camera !== undefined )
      this.camera = this.gltf.getElement( ElementType.CAMERA, data.camera );

    if( data.matrix !== undefined )
      this.setMatrix( <mat4> new Float32Array( data.matrix ) );

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

    if( data.children !== undefined ){
      for (var i of data.children) {
        this.add( this.gltf.getElement(ElementType.NODE, i ) as any as NGLNode );
      }
    }
  
    if( data.skin !== undefined ) {
      this.skin = this.gltf.getElement( ElementType.SKIN, data.skin )
    }

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

 
  

}


