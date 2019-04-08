
/// <

import * as Net from './lib/net'
import when   from 'when'

import UTF8   from './lib/utf8-decoder'


import Extensions  from './extensions'           ;
import Accessor    from './elements/Accessor'    ;
import BufferView  from './elements/BufferView'  ;
import Buffer      from './elements/Buffer'      ;
import Animation   from './elements/Animation'   ;
import Node        from './elements/Node'        ;
import Material    from './elements/Material'    ;
import Mesh        from './elements/Mesh'        ;
import Skin        from './elements/Skin'        ;
import Camera      from './elements/Camera'      ;
import BaseElement from './elements/BaseElement' ;

import { ElementType } from './consts';

// import type AnimationSampler from './elements/AnimationSampler';
// import type AnimationChannel from './elements/AnimationChannel';
// import type BaseElement      from './elements/BaseElement';
// import type {ElementType}    from './consts';




const MAGIC      = 0x46546C67; // "glTF"
const JSON_MAGIC = 0x4E4F534A; // "JSON"
const GLB_HEADER_SIZE = 20;



/** Gltf file representation */
export default class Gltf{
  
  _url        : string
  _baseDir    : string
  _data       : any
  _extensions :Extensions
  

  _elements         : BaseElement[];

  _byType           : Map<ElementType, BaseElement[]>;

  constructor(){
    this._url        = null;
    this._data       = null;

    this._extensions = new Extensions();


    this._byType = new Map<ElementType, BaseElement[]>([
      [ElementType.BUFFER            , [] ],
      [ElementType.BUFFERVIEW        , [] ],
      [ElementType.ACCESSOR          , [] ],
      [ElementType.ANIMATION         , [] ],
      [ElementType.ANIMATION_SAMPLER , [] ],
      [ElementType.ANIMATION_CHANNEL , [] ],
      [ElementType.MESH              , [] ],
      [ElementType.PRIMITIVE         , [] ],
      [ElementType.NODE              , [] ],
      [ElementType.MATERIAL          , [] ],
    ])

    this._elements = []

  }


  get accessors():Accessor[]{
    return this._getTypeHolder<Accessor>(ElementType.ACCESSOR);
  }

  get animations():Animation[]{
    return this._getTypeHolder<Animation>(ElementType.ANIMATION);
  }

  get buffers():Buffer[]{
    return this._getTypeHolder<Buffer>(ElementType.BUFFER);
  }

  get bufferViews():BufferView[]{
    return this._getTypeHolder<BufferView>(ElementType.BUFFERVIEW);
  }


  _getTypeHolder<T extends BaseElement>( type : ElementType ) : T[] {
    return this._byType.get( type ) as T[];
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

 
  getElement<T extends BaseElement>( type:ElementType, index:number ) : T {
    return this._getTypeHolder<T>(type)[index]; 
  }
 

  getElementByName<T extends BaseElement>( type:ElementType, name:string ) : T {
    const list : T[] = this._getTypeHolder<T>(type);
    for (var el of list) {
      if( el.name === name ) return el;
    }
    return null;
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
    const buffers : BaseElement[] = this._getTypeHolder(ElementType.BUFFER);
    for (var i = buffers.length; i < this._data.buffers.length; i++) {
      this.addElement( new Buffer( this, this._data.buffers[i] ) )
    }
    
    return when.map( buffers, b=>b.load() );

  }


  parse = ()=>{

    this._parseElements( ElementType.BUFFERVIEW , BufferView );
    this._parseElements( ElementType.ACCESSOR   , Accessor   );
    this._parseElements( ElementType.MESH       , Mesh       );
    this._parseElements( ElementType.NODE       , Node       );
    this._parseElements( ElementType.ANIMATION  , Animation  );
    this._parseElements( ElementType.SKIN       , Skin       );
    this._parseElements( ElementType.CAMERA     , Camera     );
    this._parseElements( ElementType.MATERIAL   , Material   );

    // resolve nodes refs
    const nodes = this._getTypeHolder<Node>(ElementType.NODE);
    for (var node of nodes) {
      node.resolveReferences();
    }

  }


  _parseElements( type:ElementType, _Class: new (Gltf, any) => BaseElement ){
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