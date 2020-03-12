


import BaseElement, { ElementMixin } from './BaseElement';
import NGLNode from 'nanogl-node'


import  Gltf   from '../index';
import  Skin   from './Skin'  ;
import  Camera from './Camera';
import  Mesh   from './Mesh'  ;
import { mat4 } from 'gl-matrix';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';



export default class Node extends ElementMixin( NGLNode ) {


  readonly gltftype : GltfTypes.NODE = GltfTypes.NODE;

  camera      : Camera;
  skin        : Skin;
  mesh        : Mesh;
  weights     : Float32Array;


  parse( gltfLoader:GltfLoader, data: Gltf2.INode ){

    // super.parse();

    this.uuid       = data.uuid;
    this.gltf       = gltfLoader.gltf;
    this.name       = data.name      
    this.extras     = data.extras    
    this.extensions = data.extensions

    if( data.camera !== undefined )
      this.camera = this.gltf.getElement( GltfTypes.CAMERA, data.camera );

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
      this.mesh = this.gltf.getElement( GltfTypes.MESH, data.mesh );

    if( data.children !== undefined ){
      for (var i of data.children) {
        this.add( this.gltf.getElement(GltfTypes.NODE, i ) as any as NGLNode );
      }
    }
  
    if( data.skin !== undefined ) {
      this.skin = this.gltf.getElement( GltfTypes.SKIN, data.skin )
    }

    this.invalidate();
    
  }


  
  // set weights( weights ){
  //   this.mesh.weights.set( weights );
  // }

  // get weights( ){
  //   return this.mesh.weights;
  // }

 
  

}


