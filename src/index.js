import * as Net from 'lib/net'
import when   from 'when'

import UTF8   from 'lib/utf8-decoder'


import { ALL_TYPES, TYPE_BUFFER, TYPE_BUFFERVIEW } from './consts';
import Extensions from './extensions';
import BaseElement from './elements/BaseElement';
import Accessor from './elements/Accessor';
import BufferView from './elements/BufferView';
import Buffer from './elements/Buffer';

import Assert from './lib/assert';




const MAGIC      = 0x46546C67; // "glTF"
const JSON_MAGIC = 0x4E4F534A; // "JSON"
const GLB_HEADER_SIZE = 20;


export default class Gltf{
  

  constructor(){
    this._url        = null;
    this._data       = null;

    this._extensions = new Extensions();

    this.buffers     = [];
    this.bufferViews = null;
    this.accessors   = null;
    

  }


  getAllElements(){
    return ALL_TYPES.reduce( 
      (a,k)=>a.concat( this[k] ),
      []
    );
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
      this.buffers[i] = new Buffer( this, this._data.buffers[i] )
    }

    return when.map( this.buffers, b=>b.load() );

  }


  parse = ()=>{


    this.bufferViews = this._data.bufferViews.map( d=>new BufferView  (this, d) );
    this.accessors   = this._data.accessors  .map( d=>new Accessor    (this, d) );

    // for( var t of ALL_TYPES ){

    //   var _Class = BaseElement.getDefinition( t );
    //   this[t] = this._data[t].map( 
    //     d=>new _Class( this, d )
    //   )
    // }

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