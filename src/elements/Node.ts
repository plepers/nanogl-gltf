
import NGLNode from 'nanogl-node'
import  Skin   from './Skin'  ;
import  Camera from './Camera';
import  Mesh   from './Mesh'  ;
import { mat4 } from 'gl-matrix';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import MeshRenderer from '../renderer/MeshRenderer';
import { IElement } from '../types/Elements';
import Gltf from '../Gltf';


/**
 * The Node element is a node in the scene graph, it contains a transformation matrix or a translation/scale vectors & scale quaternion, and can be used to control a camera, a skin, a mesh, or children nodes.
 */
export default class Node extends NGLNode implements IElement {

  readonly gltftype : GltfTypes.NODE = GltfTypes.NODE;
  name        : undefined | string;
  extras      : any   ;

  /**
   * If the node is used to control a camera, this is the Camera element
   */
  camera?     : Camera;

  /**
   * If the node is used to control a skin, this is the Skin element
   */
  skin?       : Skin;

  /**
   * If the node is used to control a mesh, this is the Mesh element
   */
  mesh?       : Mesh;

  /**
   * If the node is used to control a mesh with morph targets, this is the weights array
   */
  weights?    : Float32Array = null;

  /**
   * If the node is used to control a mesh, this is the MeshRenderer element, used to render the mesh
   */
  renderable? : MeshRenderer;

  /**
   * The initial transform of this node as defined in the gltf file
   */
  restMatrix  : mat4 = mat4.create();


  /**
   * Parse the Node data, apply the transformation matrix or the translation/scale vectors & scale quaternion,
   * link the camera, skin and mesh elements and weights array if needed, and add children nodes to this node.
   * 
   * Is async as it needs to wait for all possible Camera, Skin, Mesh and children Nodes elements to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
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


      
    if( data.children !== undefined ){
      const childPromises = data.children.map( (index)=>gltfLoader.getElement(GltfTypes.NODE, index) );
      const children = await Promise.all( childPromises );
      for (const child of children) {
        this.add( child );
      }
    }
    
    if( data.skin !== undefined ) {
      this.skin = await gltfLoader.getElement( GltfTypes.SKIN, data.skin )
    }

    
    if( data.mesh !== undefined ) {
      this.mesh = await gltfLoader.getElement( GltfTypes.MESH, data.mesh );
      const targets = this.mesh.primitives[0].targets
      if( targets ){
        this.weights = new Float32Array(targets.length);    
      }
    }

    if( data.weights !== undefined ){
      if( this.weights === null || this.weights.length !== data.weights.length ){
        throw new Error( "morph weights on node doesn't match mesh targets" );
      }
      this.weights.set( data.weights );
    }
    

    this.name = data.name ?? (this.mesh?.name )

    this.invalidate();
    this.updateMatrix();
    this.restMatrix.set( this._matrix );
    
  }

  /**
   * Find a child Node by name.
   * 
   * It will search only at the first level of children, not recursively. If you want to search recursively, use findDescendant.
   * @param name Name of the child Node to find
   */
  findChild( name : string ) : Node|undefined {
    for (let i = 0; i < this._children.length; i++) {
      const child = this._children[i] as Node;
      if( child.name === name ) return child;
    }
    return undefined;
  }
  
  /**
   * Find a descendant Node by name.
   * 
   * It will search recursively in all levels of the children nodes.
   * @param name Name of the descendant Node to find
   */
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
  
  /**
   * If the Node has a Mesh, creates a MeshRenderer and stores it to the renderable attribute, getting the Node ready to be rendered.
   * @param gltf The Gltf object which this Node belongs to
   */
  allocateGl( gltf : Gltf ) : void {
    
    if( this.mesh ){
      this.renderable = new MeshRenderer( gltf, this );
    }
    
  }

}
