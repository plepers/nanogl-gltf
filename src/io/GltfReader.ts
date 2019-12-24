
import Gltf from "..";

import when from 'when'
import IOInterface from "./IOInterface";
import { ElementType, MAGIC, GLB_HEADER_SIZE, JSON_MAGIC, ROOT_TYPES } from "../consts";
import Buffer from "../elements/Buffer";
import BaseElement from "../elements/BaseElement";
import { DataGlTF } from "../schema/glTF";
import ElementFactory, { IElementFactory } from "./ElementFactory";
import Asset from "../elements/Asset";





export default class GltfReader {


  gltf      : Gltf;

  _url     : string;
  _baseUrl : string;
  gltfIO   : IOInterface;

  _data    : DataGlTF ;

  _defaultFactory : IElementFactory;
  _factory        : IElementFactory;


  constructor( gltfIO : IOInterface, url : string, baseurl : string ){
    this.gltfIO   = gltfIO;
    this._url     = url;
    this._baseUrl = baseurl; 
    this.gltf     = new Gltf();
    this._data    = null; 

    this._defaultFactory = new ElementFactory();
    this._factory = this._defaultFactory;

  }



  parse = (buffer: ArrayBuffer) : Promise<Gltf>=>{
    return this.unpack( buffer )
      .then( this.loadBuffers )
      .then( this.parseAll )
      .then( this.yieldGltf );
  }


  unpack = ( buffer: ArrayBuffer ) : Promise<any>=>{
    const magic = new Uint32Array( buffer, 0, 1 )[0];
    
    if( magic === MAGIC ){ 
      this.unpackGlb( buffer );
    } else {
      const jsonStr = this.gltfIO.decodeUTF8( buffer );
      this._data = JSON.parse( jsonStr );
    }

    return when(true);

  }


  unpackGlb( buffer : ArrayBuffer ){

    const [, version, ,jsonSize, magic ] = new Uint32Array( buffer, 0, 5 );
    // Check that the version is 2
    if (version !== 2) 
      throw new Error('Binary glTF version is not 2');
    
    // Check that the scene format is 0, indicating that it is JSON
    if ( magic !== JSON_MAGIC )
        throw new Error('Binary glTF scene format is not JSON');
    
    const scene = this.gltfIO.decodeUTF8( buffer, GLB_HEADER_SIZE, jsonSize );
    this._data = JSON.parse( scene );

    const bbytes = buffer.slice( GLB_HEADER_SIZE + jsonSize + 8 );
    const mbuffer = new Buffer()
    mbuffer.parse( this.gltf, {byteLength:bbytes.byteLength} );
    mbuffer._bytes = bbytes;
    this.gltf.addElement( mbuffer )

  }


  loadBuffers = ()=>{
    const buffers : BaseElement[] = this.gltf._getTypeHolder(ElementType.BUFFER);
    for (var i = buffers.length; i < this._data.buffers.length; i++) {
      var buffer = new Buffer();
      buffer.parse( this.gltf, this._data.buffers[i] );
      this.gltf.addElement( buffer );
    }
    
    return when.map( buffers, this.loadBuffer );

  }


  loadBuffer = (b:Buffer)=>{

    if( b.uri === undefined ) 
      return ( b._bytes );
    
    const uri = this.gltfIO.resolvePath( b.uri, this._baseUrl );
    return this.gltfIO.loadBinaryResource( uri )
      .then( data=>b._bytes = data );

  }


  
  parseAll = ()=>{

    const gltf = this.gltf;
    
    gltf.asset = this._factory.createElement( ElementType.ASSET ) as Asset;
    gltf.asset.parse( gltf, this._data.asset )



    const elementDataPair : [BaseElement,any][] = [];
    
    for (let type of ROOT_TYPES) {

      this._data[type]?.forEach( (data: any)=>{
        const element = this._factory.createElement( type );
        if( element !== null ){
          elementDataPair.push( [element, data])
          gltf.addElement( element )
        }
      })

    }
    
    elementDataPair.forEach( ([element, data])=>element.parse( gltf, data));
  
  }


  yieldGltf = ():Promise<Gltf>=>{
    return when( this.gltf );
  }


}

