import Accessor from './Accessor'
import { IMaterial } from './Material'
import { GLContext } from 'nanogl/types';
import GLArrayBuffer from 'nanogl/arraybuffer';
import Program from 'nanogl/program';
import Vao from 'nanogl-vao';
import GLIndexBuffer from 'nanogl/indexbuffer';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import BufferView from './BufferView';
import Gltf from '../Gltf';
import { IElement } from '../types/Elements';
import Bounds from 'nanogl-pbr/Bounds';


/**
 * A helper class to manage a Primitive's attribute (linking an attribute name to its Accessor)
 */
export class Attribute {

  /**
   * The standard Semantic for this attribute (POSITION, NORMAL, TEXCOORDS_0, ...)
   */
  semantic : string;

  /**
   * The accessor providing data for this attribute
   */
  accessor : Accessor;

  /**
   * The glsl attribute name
   */
  glslname : string
  
  /**
   * @param semantic Attribute's semantic
   * @param accessor Attribute's Accessor
   */
  constructor( semantic:string , accessor:Accessor ){
    this.semantic = semantic;
    this.accessor = accessor;
    this.glslname = Gltf.getSemantics().getAttributeName( semantic );
  }
  
}


/**
 * A helper class to manage a set of Attributes sharing the same BufferView
 */
export class BufferInfos {
  
  /**
   * The Attributes sharing the same BufferView
   */
  attributes: Attribute[];

  /**
   * The BufferView
   */
  accessor : Accessor;

  constructor(accessor:Accessor){
    this.accessor = accessor;
    this.attributes = [];
  }

  addAttribute( attribute : Attribute ){
    this.attributes.push( attribute );
  }
  
}


/**
 * A helper class to manage an array of Attributes
 */
export class AttributesSet {

  /**
   * The list of attributes
   */
  _attributes: Attribute[];

  constructor(){
    this._attributes = [];
  }

  get length() :number {
    return this._attributes.length;
  }

  get attributes(): Attribute[]{
    return this._attributes;
  }

  /**
   * Add an attribute to the set
   * @param attribute Attribute to add
   */
  add( attribute : Attribute ){
    this._attributes.push( attribute );
  }

  /**
   * Get an Attribute by its semantic (POSITION, NORMAL, TEXCOORD_0, ...)
   * @param semantic Semantic of the attribute to get
   */
  getSemantic( semantic : string ) : Attribute {
    for (const a of this._attributes ) {
      if( a.semantic === semantic ) return a;
    }
    return null;
  }

  /*
   * Get sets of attributes ordered by BufferView
   */
  getBuffersViewSets() : BufferInfos[] {

    const map : Map<BufferView, BufferInfos> = new Map();
    
    for (const a of this._attributes ) {
      const bId = a.accessor.bufferView;
      if( !map.has( bId ) ){
        map.set( bId, new BufferInfos( a.accessor) );
      }
      map.get( bId ).addAttribute( a );
    }

    return Array.from( map.values() );
  }

}


const ELEMENT_ARRAY_BUFFER = 0x8893 
const ARRAY_BUFFER = 0x8892


/**
 * The Primitive element is a set of attributes defining a geometry to render with a given material and in a given mode.
 * It may be indexed, and may have morph targets.
 * 
 * It's the most basic renderable element, as a Scene is made of Meshes, and a Mesh is made of Primitives.
 */
export default class Primitive implements IElement {

  readonly gltftype : GltfTypes.PRIMITIVE = GltfTypes.PRIMITIVE;
  name        : undefined | string;
  extras      : any   ;
  

  // GLTF

  /**
   * The set of attributes for this Primitive (POSITION, NORMAL, TEXCOORD_0, ...)
   */
  attributes : AttributesSet;

  /**
   * The rendering mode to use for this Primitive (TRIANGLES, LINES, POINTS, ...).
   * If not defined, the default mode is TRIANGLES.
   */
  mode       : Gltf2.MeshPrimitiveMode;

  /**
   * The Material to use for this Primitive.
   * If not defined, a default material with no effect will be used.
   */
  material   : IMaterial = null;

  /**
   * The indices to use to render this Primitive, if it is indexed.
   * If not indexed, the Primitive is rendered in vertices' order.
   */
  indices    : Accessor = null;

  /**
   * The Morph Targets to use to render this Primitive, if it is morphed.
   */
  targets    : AttributesSet[] = null;
  
  
  // Rendering

  /**
   * The VAOs for this Primitive, one per Program used.
   * A VAO is a WebGLVertexArrayObject, containing the Primitive's attributes and indices, useful to bind/unbind them all at once.
   */
  _vaoMap     : Map<string, Vao>

  /**
   * The current VAOs for this Primitive, used for rendering.
   */
  _currentVao : Vao;

  /**
   * The GLArrayBuffers for this Primitive's attributes (basic & morph target)
   */
  buffers     : GLArrayBuffer[];

  /**
   * The GLIndexBuffer for this Primitive's indices, if it is indexed.
   */
  indexBuffer : GLIndexBuffer;


  /**
   * The bounding box of this Primitive
   */
  readonly bounds : Bounds = new Bounds();


  /**
   * Calculate the bounding box of this Primitive, based on its POSITION attribute.
   */
  _calculaterBounds() : void {
    const pos = this.attributes.getSemantic( 'POSITION' );
    if( pos != null && pos.accessor.min && pos.accessor.max ){
      this.bounds.fromMinMax( pos.accessor.min, pos.accessor.max );
    }
  }

  /**
   * Parse the Primitive data, load the attributes, indices, material and morph targets, and calculate the bounding box.
   * 
   * Is async as it needs to wait for the Accessors, and possible Material, to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse( gltfLoader:GltfLoader, data:Gltf2.IMeshPrimitive ) : Promise<any> {

    this.attributes = new AttributesSet();
    await this.parseAttributeSet( gltfLoader, this.attributes, data.attributes );

    
    if( data.indices !== undefined )
      this.indices = await gltfLoader.getElement( GltfTypes.ACCESSOR, data.indices );

    if( data.material !== undefined ){
      this.material = await gltfLoader.getElement( GltfTypes.MATERIAL, data.material );
    } else {
      this.material = await gltfLoader.loadDefaultMaterial();
    }

    if( data.mode !== undefined)
      this.mode = data.mode;
    else
      this.mode = Gltf2.MeshPrimitiveMode.DEFAULT;

    if( data.targets !== undefined ){
      this.targets = [];

      for (let i = 0; i < data.targets.length; i++) {
        const tgt = data.targets[i];
        const aset = new AttributesSet();
        await this.parseMorphAttributeSet( gltfLoader, aset, tgt, i );
        this.targets.push( aset );
      }
    }

    this._calculaterBounds();
  }

  /**
   * Parse the attributes of a Primitive and store it in an AttributesSet.
   * 
   * Is async as it needs to wait for the Attribute's Accessors to be loaded, or created if not yet loaded.
   * @param gltfLoader GLTFLoader to use to load the Accessors
   * @param aset AttributesSet to fill
   * @param data Data to parse
   */
  async parseAttributeSet( gltfLoader:GltfLoader, aset : AttributesSet, data : any ) {
    
    for (const attrib in data ) { 
      const accessor:Accessor = await gltfLoader.getElement( GltfTypes.ACCESSOR, data[attrib] );
      aset.add( new Attribute( attrib, accessor ) );
    }

  }
  
  /**
   * Parse the attributes of a Primitive's Morph Target and store it in an AttributesSet.
   * 
   * Is async as it needs to wait for the Attribute's Accessors to be loaded, or created if not yet loaded.
   * @param gltfLoader GLTFLoader to use to load the Accessors
   * @param aset AttributesSet to fill
   * @param data Data to parse
   * @param morphIndex Index of the Morph Target
   */
  async parseMorphAttributeSet( gltfLoader:GltfLoader, aset : AttributesSet, data : any, morphIndex : number ) {
    
    for (const attrib in data ) { 
      const accessor:Accessor = await gltfLoader.getElement( GltfTypes.ACCESSOR, data[attrib] );
      const attribute = new Attribute( attrib, accessor )
      attribute.glslname = Gltf.getSemantics().getMorphedAttributeName( attribute.semantic, morphIndex );
      aset.add( attribute );
    }

  }

  /**
   * Create the GLArrayBuffers for Primitive's attributes (basic & morph target) and GLIndexBuffer for Primitive's indices.
   * After that, the Primitive is ready to be rendered.
   * @param gl GL context to use
   */
  allocateGl( gl : GLContext ) : void {

    this._vaoMap = new Map();
    this.buffers = [];

    const buffersSet = this.attributes.getBuffersViewSets();
    
    for( const set of buffersSet ){
      this.buffers.push( this.createArrayBuffer( gl, set ) );
    }

    if( this.indices !== null ){
      const glBuffer = this.indices.bufferView.getWebGLBuffer( gl, ELEMENT_ARRAY_BUFFER )
      this.indexBuffer = new GLIndexBuffer( gl, this.indices.componentType, undefined, gl.STATIC_DRAW, glBuffer )
      this.indexBuffer.byteLength = this.indices.bufferView.byteLength;
    }

    if( this.targets !== null ){
      for (let i = 0; i < this.targets.length; i++) {
        const target = this.targets[i];
        const buffersSet = target.getBuffersViewSets();
        for( const set of buffersSet ){
          this.buffers.push( this.createArrayBuffer( gl, set ) );
        }
      }
    }

  }

  /**
   * Create a GLArrayBuffer from an attribute (or a set of attributes sharing the same BufferView)
   * @param gl GL context to use
   * @param set Set of attributes to create the array buffer from
   */
  createArrayBuffer( gl: GLContext, set : BufferInfos ){

    const bufferView = set.accessor.bufferView
    const glBuffer = bufferView.getWebGLBuffer( gl, ARRAY_BUFFER )

    const glArraybuffer = new GLArrayBuffer(gl, undefined, gl.STATIC_DRAW, glBuffer );
    glArraybuffer.byteLength = bufferView.byteLength;
    glArraybuffer.stride = set.accessor._stride;
    glArraybuffer._computeLength();


    for (const attribute of set.attributes ) {
      const def = this.createAttributeDefinition( attribute );
      glArraybuffer.attribs.push(def);
    }
    
    return glArraybuffer;
    
  }
  
  /**
   * Create an attribute definition from an Attribute, to be used in a GLArrayBuffer
   * @param attribute Attribute to create the definition from
   */
  createAttributeDefinition( attribute : Attribute ){
    const accessor = attribute.accessor;
    return {
      name      : attribute.glslname     ,
      type      : accessor .componentType,
      size      : accessor .numComps     ,
      normalize : accessor .normalized   ,
      offset    : accessor .byteOffset   ,
      stride    : accessor ._stride
    }
  }

  /**
   * Get the Primitive's VAO linked to a specific Program. If it doesn't exist yet, create it.
   * @param prg 
   */
  getVao( prg: Program ){
    const id = prg._cuid.toString();

    if( !this._vaoMap.has( id ) ){
      const vao = new Vao( prg.gl );
      vao.setup( prg, this.buffers, this.indexBuffer );
      this._vaoMap.set( id, vao );
    }

    return this._vaoMap.get( id );
  }

  /**
   * Bind the VAO containing the Primitive's attributes and indices, ready to be drawn.
   * Called by the MeshRenderer just before rendering the Primitive.
   * @param prg 
   */
  bindVao( prg: Program ){
    this._currentVao = this.getVao( prg )
    this._currentVao.bind();
  }

  /**
   * Draw the Primitive, using its indices if it is indexed, or its vertices' order if it is not.
   * Called by the MeshRenderer.
   */
  render(){
    if( this.indexBuffer ){
      this.indexBuffer.draw( this.mode, this.indices.count, this.indices.byteOffset );
    }
    else 
      this.buffers[0].draw( this.mode );    
  }

  /**
   * Unbind the Primitive's VAO. 
   * Called by the MeshRenderer just after rendering the Primitive.
   */
  unbindVao(){
    this._currentVao.unbind()
  }

}
