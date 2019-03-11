// @flow


import * as Net from './lib/net'
import when   from 'when'

import UTF8   from './lib/utf8-decoder'


import Extensions from './extensions'          ;
import Accessor   from './elements/Accessor'   ;
import BufferView from './elements/BufferView' ;
import Buffer     from './elements/Buffer'     ;
import Animation  from './elements/Animation'  ;
import Node       from './elements/Node'       ;
import Material   from './elements/Material'   ;
import Mesh       from './elements/Mesh'       ;
import Skin       from './elements/Skin'       ;
import Camera     from './elements/Camera'     ;

import { TYPE_ANIMATION_CHANNEL,TYPE_ANIMATION_SAMPLER,TYPE_ACCESSOR,TYPE_BUFFERVIEW, TYPE_BUFFER, TYPE_ANIMATION, TYPE_MESH, TYPE_PRIMITIVE, TYPE_NODE, TYPE_MATERIAL } from './consts';

import type AnimationSampler from './elements/AnimationSampler';
import type AnimationChannel from './elements/AnimationChannel';
import type BaseElement      from './elements/BaseElement';
import type {ElementType}    from './consts';




const MAGIC      = 0x46546C67; // "glTF"
const JSON_MAGIC = 0x4E4F534A; // "JSON"
const GLB_HEADER_SIZE = 20;



/** Gltf file representation */
export default class Gltf{
  
  _url        : ?string
  _baseDir    : string
  _data       : Object
  _extensions :Extensions
  

  _elements         : BaseElement[];

  _byType           : Map<ElementType, BaseElement[]>;

  constructor(){
    this._url        = null;
    this._data       = null;

    this._extensions = new Extensions();


    this._byType = new Map<ElementType, BaseElement[]>([
      [TYPE_BUFFER            , [] ],
      [TYPE_BUFFERVIEW        , [] ],
      [TYPE_ACCESSOR          , [] ],
      [TYPE_ANIMATION         , [] ],
      [TYPE_ANIMATION_SAMPLER , [] ],
      [TYPE_ANIMATION_CHANNEL , [] ],
      [TYPE_MESH              , [] ],
      [TYPE_PRIMITIVE         , [] ],
      [TYPE_NODE              , [] ],
      [TYPE_MATERIAL          , [] ],
    ])

    this._elements = []

  }


  get accessors():Accessor[]{
    return this._getTypeHolder<Accessor>(TYPE_ACCESSOR);
  }

  get animations():Animation[]{
    return this._getTypeHolder<Animation>(TYPE_ANIMATION);
  }

  get buffers():Buffer[]{
    return this._getTypeHolder<Buffer>(TYPE_BUFFER);
  }

  get bufferViews():BufferView[]{
    return this._getTypeHolder<BufferView>(TYPE_BUFFERVIEW);
  }


  _getTypeHolder<T:BaseElement>( type : ElementType ) : T[] {
    const h:any = this._byType.get( type );
    return (h:T[]);
  }
  

  getAllElements() : BaseElement[]{
    return this._elements;
  }


  addElement( element : BaseElement ){
    const a: BaseElement[] = this._getTypeHolder( element.elementType );
    if( a.indexOf( element ) === -1 ){
      a.push( element );
      this._elements.push( element );
    }
  }


 
  addElements( elements : BaseElement[] ){
    for (var e of elements) {
      this.addElement( e );
    }
  }

 
  getElement<T:BaseElement>( type:ElementType, index:number ) : T {
    const v : any = this._getTypeHolder(type)[index]; 
    return ( v : T );
  }


  load( url : string ): Promise<any>{

    this._url = url;
    this._baseDir = Net.baseDir( url );
    
    return Net.loadBytes( url )
      .then( this.unpack )
      .then( this.loadBuffers )
      .then( this.parse )

  }


  unpack = ( buffer: ArrayBuffer )=>{
    const magic = new Uint32Array( buffer, 0, 1 )[0];
    
    if( magic === MAGIC ){ 
      this.unpackGlb( buffer );
    } else {
      const jsonStr = UTF8( new Uint8Array(buffer) );
      this._data = JSON.parse( jsonStr );
    }

  }


  unpackGlb( buffer : ArrayBuffer ){

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
    this.addElement( mbuffer )

  }


  loadBuffers = ()=>{
    const buffers : BaseElement[] = this._getTypeHolder(TYPE_BUFFER);
    for (var i = buffers.length; i < this._data.buffers.length; i++) {
      this.addElement( new Buffer( this, this._data.buffers[i] ) )
    }
    
    return when.map( buffers, b=>b.load() );

  }


  parse = ()=>{

    this._parseElements( 'bufferViews' , BufferView );
    this._parseElements( 'accessors'   , Accessor   );
    this._parseElements( 'nodes'       , Node       );
    this._parseElements( 'animations'  , Animation  );
    this._parseElements( 'skins'       , Skin       );
    this._parseElements( 'meshes'      , Mesh       );
    this._parseElements( 'cameras'     , Camera     );
    this._parseElements( 'materials'   , Material   );

    // resolve nodes refs

  }


  _parseElements( type:ElementType, _Class:Class<BaseElement> ){
    if( this._data[type] ){
      this._data[type].forEach( d=>this.addElement( new _Class(this, d) ) );
    }
  }



  resolveUri( uri : string ) : string {
    return this._baseDir + uri;
  }


  // addExternalResource( p ){
  //   this._loadables.push( p );
  // }


}


/// #if DEBUG

// hot reload

/// #endif