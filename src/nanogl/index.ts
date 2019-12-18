import Gltf from "..";

import { MeshRenderable, IRenderable } from './Renderable'
import Primitive from "./Primitive";

import GltfNode from "../elements/Node";
import GltfPrimitive from "../elements/Primitive";
import ElementImpl from "./ElementImpl";
import BaseElement from "../elements/BaseElement";
import { AnyElement } from "../elements/AnyElement.type";


type AnyElementImpl = ElementImpl<AnyElement>;


function filterRenderableNodes( node:GltfNode ){
  return ( node.mesh !== undefined );
}


class NanoglBackend {

  gl   : WebGLRenderingContext;
  gltf : Gltf;

  renderables   : IRenderable[];
  _elements     : AnyElementImpl[];
  _elementsByUid: Map<Number, AnyElementImpl>;


  constructor( gl:WebGLRenderingContext, gltf : Gltf ){
    
    this.gl   = gl;
    this.gltf = gltf;

    this._elements = []
    this._elementsByUid = new Map<Number, AnyElementImpl>();

    this.renderables = [];

    // meshes

    // primitives

    // materials

  }


  addElement( e : ElementImpl<BaseElement> ){
    this._elements.push( e );
    this._elementsByUid.set( e.getElement().uid, e );
  }
  
  getElement<T extends AnyElement>( e : BaseElement ) : AnyElementImpl{
    return this._elementsByUid.get( e.uid );
  }


  hasElement( e : BaseElement ) : Boolean {
    return this._elementsByUid.has( e.uid );
  }



  createRenderables(){
    
    const renderableNodes = this.gltf.nodes.filter( filterRenderableNodes );
    
    // for ( var node of renderableNodes ) {
    //   this.renderables.push( this.createRenderable( node ) );
    // }
    
  }
  
  
  // createRenderable( node : GltfNode ) : IRenderable {

  //   if( this.hasElement( node ) )
  //     return this.getElement<GltfNode>( node );

  //   const r = new MeshRenderable( node.mesh );

  //   const primitives = this.createPrimitives( node.mesh.primitives );
  //   return r;
  // }


  // createPrimitives(primitives: GltfPrimitive[] ) : Primitive[] {
    
  // }


}