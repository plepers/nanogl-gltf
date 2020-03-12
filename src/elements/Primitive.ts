


import BaseElement from './BaseElement';


import Accessor from './Accessor'
import Material from './Material'
import { GLContext } from 'nanogl/types';
import { ArrayBufferType } from '../BufferCache';
import GLArrayBuffer from 'nanogl/arraybuffer';
import Program from 'nanogl/program';
import Vao from 'nanogl-vao';
import GLIndexBuffer from 'nanogl/indexbuffer';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';


class Attribute {

  semantic : string;
  accessor : Accessor;
  
  constructor( semantic:string , accessor:Accessor ){
    this.semantic = semantic;
    this.accessor = accessor;
  }
  
}


class BufferInfos {
  
  attributes: Attribute[];
  accessor : Accessor;

  constructor(accessor:Accessor){
    this.accessor = accessor;
    this.attributes = [];
  }

  addAttribute( attribute : Attribute ){
    this.attributes.push( attribute );
  }
  
}


class AttributesSet {

  
  _attributes: Attribute[];

  constructor(){
    this._attributes = [];
  }


  get length() :number {
    return this._attributes.length;
  }

  add( attribute : Attribute ){
    this._attributes.push( attribute );
  }


  getSemantic( semantic : string ) : Attribute {
    for (var a of this._attributes ) {
      if( a.semantic === semantic ) return a;
    }
    return null;
  }



  /*
   * return set of attributes group by bufferView
   */
  getBuffersViewSets() : BufferInfos[] {

    const map : Map<string, BufferInfos> = new Map();

    for (var a of this._attributes ) {
      var bId = a.accessor.bufferView.uuid;
      if( !map.has( bId ) ){
        map.set( bId, new BufferInfos( a.accessor) );
      }
      map.get( bId ).addAttribute( a );
    }

    return Array.from( map.values() );
  }


}





export default class Primitive extends BaseElement {

  static TYPE :GltfTypes = GltfTypes.PRIMITIVE;
  
  // gltf
  attributes : AttributesSet;
  mode       : Gltf2.MeshPrimitiveMode;
  material   : Material = null;
  indices    : Accessor = null;
  targets    : AttributesSet[] = null;
  
  
  // rendering
  _vaoMap     : Map<string, Vao>
  _currentVao : Vao;
  buffers     : GLArrayBuffer[];
  indexBuffer : GLIndexBuffer;


  async parse( gltfLoader:GltfLoader, data:Gltf2.IMeshPrimitive ) : Promise<any> {

    super.parse( gltfLoader, data );

    
    this.attributes = new AttributesSet();
    await this.parseAttributeSet( gltfLoader, this.attributes, data.attributes );

    
    if( data.indices !== undefined )
      this.indices = await gltfLoader.getElement( GltfTypes.ACCESSOR, data.indices );

    if( data.material !== undefined )
      this.material = await gltfLoader.getElement( GltfTypes.MATERIAL, data.material );

    if( data.mode !== undefined)
      this.mode = data.mode;
    else
      this.mode = Gltf2.MeshPrimitiveMode.DEFAULT;

    if( data.targets !== undefined ){
      this.targets = [];

      for (var tgt of data.targets ) {
        const aset = new AttributesSet();
        await this.parseAttributeSet( gltfLoader, aset, tgt );
        this.targets.push( aset );
      }
    }
  }


  async parseAttributeSet( gltfLoader:GltfLoader, aset : AttributesSet, data : any ) {
    
    for (const attrib in data ) { 
      const accessor:Accessor = await gltfLoader.getElement( GltfTypes.ACCESSOR, data[attrib] );
      aset.add( new Attribute( attrib, accessor ) );
    }

  }



  allocateGl( gl : GLContext ) : void {

    this._vaoMap = new Map();
    this.buffers = [];

    const buffersSet = this.attributes.getBuffersViewSets();
    
    for( const set of buffersSet ){
      this.buffers.push( this.createArrayBuffer( gl, set ) );
    }

    if( this.indices !== null ){
      const glBuffer = this.gltf.bufferCache.getBuffer( this.indices.bufferView, ArrayBufferType.ELEMENT_ARRAY_BUFFER )
      this.indexBuffer = new GLIndexBuffer( gl, this.indices.componentType, undefined, gl.STATIC_DRAW, glBuffer )
    }

  }


  createArrayBuffer( gl: GLContext, set : BufferInfos ){

    const bufferView = set.accessor.bufferView
    const glBuffer = this.gltf.bufferCache.getBuffer( bufferView, ArrayBufferType.ARRAY_BUFFER )

    const glArraybuffer = new GLArrayBuffer(gl, undefined, gl.STATIC_DRAW, glBuffer );
    glArraybuffer.byteLength = bufferView.byteLength;
    glArraybuffer.stride = 0;


    for (const attribute of set.attributes ) {
      const def = this.createAttributeDefinition( attribute );
      glArraybuffer.attribs.push(def);
    }
    
    return glArraybuffer;
    
  }
  

  createAttributeDefinition( attribute : Attribute ){
    const accessor = attribute.accessor;
    return {
      name      : this.gltf.semantics.getAttributeName(attribute.semantic),
      type      : accessor .componentType,
      size      : accessor .numComps     ,
      normalize : accessor .normalized   ,
      offset    : accessor .byteOffset   ,
      stride    : accessor ._stride
    }
  }


  getVao( prg: Program ){
    const id = prg._cuid.toString();

    if( !this._vaoMap.has( id ) ){
      const vao = new Vao( prg.gl );
      vao.setup( prg, this.buffers, this.indexBuffer );
      this._vaoMap.set( id, vao );
    }

    return this._vaoMap.get( id );
  }


  bindVao( prg: Program ){
    this._currentVao = this.getVao( prg )
    this._currentVao.bind();
  }


  render(){
    if( this.indexBuffer )
      this.indexBuffer.draw( this.mode );
    else 
      this.buffers[0].draw( this.mode );    
  }


  unbindVao(){
    this._currentVao.unbind()
  }

}

