//@ts-check


import * as Net from 'lib/net'
import when   from 'when'

import UTF8   from 'lib/utf8-decoder'


import Extensions    from './extensions'             ;
import Accessor      from './elements/Accessor'      ;
import BufferView    from './elements/BufferView'    ;
import Buffer        from './elements/Buffer'        ;
import Animation     from './elements/Animation'     ;



/**
 * @typedef {import("./elements/AnimationChannel").default} AnimationChannel
 * @typedef {import("./elements/AnimationSampler").default} AnimationSampler
 * @typedef {Accessor|Buffer|BufferView|AnimationChannel|AnimationSampler} AnyElement
 */


const MAGIC      = 0x46546C67; // "glTF"
const JSON_MAGIC = 0x4E4F534A; // "JSON"
const GLB_HEADER_SIZE = 20;


/** Gltf file representation */
export default class Gltf{
  

  constructor(){
    this._url        = null;
    this._data       = null;

    this._extensions = new Extensions();

    /**
     * @type {Array<Buffer>}
     * @description gltf buffers
     */
    this.buffers     = [];

    /**
     * @type {Array<BufferView>}
     * @description gltf bufferViews
     */
    this.bufferViews = [];

    /**
     * @type {Array<Accessor>}
     * @description gltf accessors
     */
    this.accessors   = [];

    /**
     * @type {Array<Animation>}
     * @description gltf animations
     */
    this.animations   = [];

    /**
     * @type {Array<AnimationSampler>}
     */
    this.animationSamplers = [];
    
    /**
     * @type {Array<AnimationChannel>}
     */
    this.animationChannels = [];
    
    /**
     * @type {Array<AnyElement>}
     * @description all gltf elements
     */
    this._elements = []

  }

  /**
   * @return {Array<AnyElement>} all BaseElements owned by the gltf
   */
  getAllElements(){
    return this._elements;
  }

  /**
   * @param {AnyElement} element 
   */
  addElement( element ){
    const a = this[element.elementType];
    if( a.indexOf( element ) === -1 ){
      a.push( element );
      this._elements.push( element );
    }
  }


  /**
   * @param {Array<AnyElement>} elements
   */
  addElements( elements ){
    for (var e of elements) {
      this.addElement( e );
    }
  }

  /**
   * 
   * @param {string} type 
   * @param {number} index 
   * @returns {AnyElement}
   */
  getElement( type, index ){
    return this[type][index];
  }

  /**
   * @param {string} url 
   */
  load( url ){

    this._url = url;
    this._baseDir = Net.baseDir( url );
    
    return Net.loadBytes( url )
      .then( this.unpack )
      .then( this.loadBuffers )
      .then( this.parse )

  }


  unpack = ( buffer )=>{
    const magic = new Uint32Array( buffer, 0, 1 )[0];
    
    if( magic === MAGIC ){ 
      this.unpackGlb( buffer );
    } else {
      const jsonStr = UTF8( new Uint8Array(buffer) );
      this._data = JSON.parse( jsonStr );
    }

  }


  unpackGlb( buffer ){

    const [version, , jsonSize, magic ] = new Uint32Array( buffer, 0, 5 );
    // Check that the version is 2
    if (version !== 2) 
      throw new Error('Binary glTF version is not 2');
    
    // Check that the scene format is 0, indicating that it is JSON
    if ( magic !== JSON_MAGIC )
        throw new Error('Binary glTF scene format is not JSON');
    
    const scene = UTF8( new Uint8Array( buffer,  GLB_HEADER_SIZE, jsonSize ) );
    this._data = JSON.parse( scene );

    const mbuffer = new Buffer( this, {} );
    mbuffer._bytes = buffer.slice( GLB_HEADER_SIZE + jsonSize + 8 );
    this.buffers.push( mbuffer );

  }


  loadBuffers = ()=>{
    
    for (var i = this.buffers.length; i < this._data.buffers.length; i++) {
      this.addElement( new Buffer( this, this._data.buffers[i] ) )
    }

    return when.map( this.buffers, b=>b.load() );

  }


  parse = ()=>{

    this._parseElements( 'bufferViews' , BufferView  );
    
    this._parseElements( 'accessors'   , Accessor    );

    this._parseElements( 'animations'  , Animation   );



  }


  _parseElements( type, _Class ){
    if( this._data[type] ){
      this._data[type].forEach( d=>this.addElement( new _Class(this, d) ) );
    }
  }



  resolveUri( uri ){
    return this._baseDir + uri;
  }


  // addExternalResource( p ){
  //   this._loadables.push( p );
  // }


}


/// #if DEBUG

// hot reload

/// #endif