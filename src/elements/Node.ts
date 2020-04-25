
import NGLNode from 'nanogl-node'
import  Skin   from './Skin'  ;
import  Camera from './Camera';
import  Mesh   from './Mesh'  ;
import { mat4 } from 'gl-matrix';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import MeshRenderer from '../renderer/MeshRenderer';
import IRenderable from '../renderer/IRenderable';
import { GLContext } from 'nanogl/types';
import { IElement } from '../types/Elements';



export default class Node extends NGLNode implements IElement {


  readonly gltftype : GltfTypes.NODE = GltfTypes.NODE;

  name        : undefined | string;
  extras      : any   ;

  camera?     : Camera;
  skin?       : Skin;
  mesh?       : Mesh;
  // weights?    : Float32Array;

  renderable? : MeshRenderer;

  async parse( gltfLoader:GltfLoader, data: Gltf2.INode ){
    // super.parse();
    // this.uuid         = data.uuid;
    // this.elementIndex = data.elementIndex;
    // this.gltf         = gltfLoader.gltf;    
    this.extras       = data.extras    
    // this.extensions   = data.extensions

    if( data.camera !== undefined )
      this.camera = await gltfLoader.getElement( GltfTypes.CAMERA, data.camera );

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

      
    if( data.children !== undefined ){
      const childPromises = data.children.map( (index)=>gltfLoader.getElement(GltfTypes.NODE, index) );
      const children = await Promise.all( childPromises );
      for (var child of children) {
        this.add( child );
      }
    }
    
    if( data.skin !== undefined ) {
      this.skin = await gltfLoader.getElement( GltfTypes.SKIN, data.skin )
    }

    if( data.mesh !== undefined ) {
      this.mesh = await gltfLoader.getElement( GltfTypes.MESH, data.mesh );
    }
    

    this.name = data.name ?? (this.mesh?.name )

    this.invalidate();
    
  }

  findChild( name : string ) : Node|undefined {
    for (let i = 0; i < this._children.length; i++) {
      const child = this._children[i] as Node;
      if( child.name === name ) return child;
    }
    return undefined;
  }
  
  findDescendant( name : string ) : Node|undefined {
    let res = this.findChild( name );
    if( res === undefined ){
      for (let i = 0; i < this._children.length; i++) {
        const child = this._children[i] as Node;
        res = child.findDescendant?.( name );
        if( res !== undefined ) return res;
      }
    }
    return res;
  }
  
  allocateGl( gl : GLContext ) : void {
    
    if( this.mesh ){
      this.renderable = new MeshRenderer( gl, this );
    }
    
  }

  set weights( weights : Float32Array ){
    this.mesh.weights.set( weights );
  }

  get weights( ) : Float32Array {
    return this.mesh.weights;
  }

 
  

}


