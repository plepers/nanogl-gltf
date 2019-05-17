
import base64 from 'base64-js'
import when   from 'when'

import { loadText, loadBytes, baseDir } from "../lib/net";
import IOInterface from "./IOInterface";

import UTF8   from '../lib/utf8-decoder'
import GltfIO from ".";

class WebImpl implements IOInterface {



  isDataURI( uri : string ) : Boolean{
    return ( uri.indexOf('data:') === 0 );
  }


  decodeDataURI(uri: string): ArrayBuffer {
    if( uri.indexOf('data:') !== 0 ){
      throw new Error('invalid dataURI' )
    }
    var b64 = uri.substr( uri.indexOf(',')+1 );

    return base64.toByteArray( b64 ).buffer;
  }
  

  resolveBaseDir( path: string ) : string[]{
    return baseDir( path );
  }

  resolvePath(path: string, baseurl: string ): string {
    if( baseurl === undefined || this.isDataURI( path ) )
      return path;  
    return baseurl + '/' + path;
  }

  decodeUTF8(buffer: ArrayBuffer, offset : number = 0, length : number = undefined ): string {
    return UTF8( new Uint8Array( buffer, offset, length ) );
  }
  

  
  
  loadResource(path: string): Promise<string> {
    return loadText( path );
  }
  
  loadBinaryResource(path: string): Promise<ArrayBuffer> {
    if( this.isDataURI( path ) ){
      return when( this.decodeDataURI( path ) );
    }
    return loadBytes( path );
  }
  
  

  writeResource(path: string, data: string) : Promise<Boolean>{
    throw new Error("Method not implemented.");
  }
  
  writeBinaryResource(path: string, data: ArrayBuffer) : Promise<Boolean>{
    throw new Error("Method not implemented.");
  }


}


const _instance :  GltfIO = new  GltfIO( new WebImpl() );

export default _instance;
