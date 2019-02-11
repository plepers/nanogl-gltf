
import { TYPE_BUFFER } from '../consts';
import BaseElement from './BaseElement';
import {loadBytes} from 'lib/net'

export default class Buffer extends BaseElement {

  constructor( gltf, data ){
    super( gltf, data );

    this.byteLength = data.byteLength;
    this.uri        = data.uri;
    this._bytes     = null;

    
    this._byteOffset=0;
  }

  load(){
    // embed glb buffers
    if( this.uri === undefined ) 
      return this._bytes;

    const uri = this.gltf.resolveUri( this.uri );
    return loadBytes( uri )
      .then( b=>{
        this._bytes = b
        console.log( this, b )
       } );
  }

  

}

BaseElement._registerDefinition( TYPE_BUFFER, Buffer );
