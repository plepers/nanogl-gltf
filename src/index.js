import * as Net from 'lib/net'
import when   from 'when'

import UTF8   from 'lib/utf8-decoder'


import { ROOT_TYPES, ALL_TYPES } from './consts';

import Extensions    from './extensions'             ;
import BaseElement   from './elements/BaseElement'   ;
import Accessor      from './elements/Accessor'      ;
import BufferView    from './elements/BufferView'    ;
import Buffer        from './elements/Buffer'        ;
import createElement from './elements/ElementFactory';
import Animation     from './elements/Animation'     ;




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
     * @description gltf buffer
     */
    this.buffers     = null;

    /**
     * @type {Array<BufferView>}
     * @description gltf bufferViews
     */
    this.bufferViews = null;


    /**
     * @type {Array<Accessor>}
     * @description gltf accessors
     */
    this.accessors   = null;

    /**
     * @type {Array<Animation>}
     * @description gltf animations
     */
    this.animations   = null;

    for( var t of ALL_TYPES )
      this[t] = []
    
    

  }

  getAllElements(){
    return ALL_TYPES.reduce( 
      (a,k)=>a.concat( this[k] ),
      []
    );
  }

  /**
   * 
   * @param {BaseElement} element 
   */
  addElement( element ){
    const a = this[element.elementType];
    if( a.indexOf( element ) === -1 ){
      a.push( element );
    }
  }


  /**
   * 
   * @param {Array<BaseElement>} elements
   */
  addElements( elements ){
    for (var e of elements) {
      this.addElement( e );
    }
  }

  
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

    const u32 = new Uint32Array( buffer, 0, 5 );
    // Check that the version is 2
    if (u32[1] !== 2) 
      throw new Error('Binary glTF version is not 2');
    
    // Check that the scene format is 0, indicating that it is JSON
    if ( u32[4] !== JSON_MAGIC )
        throw new Error('Binary glTF scene format is not JSON');
    
    const jsonSize = u32[3]; 
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

    const rawData = this._data;
    
    for( const type of ROOT_TYPES ){
      const data = rawData[type];
      const Def = createElement( type );
      if( data )
        data.forEach( d=>this.addElement( new Def(this, d) ) );
    }


    for( var e of this.getAllElements() ){

      this._extensions.processElement( e );
      e.resolveReferences();
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