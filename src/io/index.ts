import Gltf from "..";
import IOInterface from "./IOInterface";
import GltfReader from "./GltfReader";






export default class GltfIO {
  
  
  _ioImpl: IOInterface;

  constructor( io : IOInterface ){
    this._ioImpl = io;
  }

   
  loadGltf(path: string, baseurl : string = undefined ): Promise<Gltf> {
    
    if( baseurl === undefined )
      [baseurl, path] = this._ioImpl.resolveBaseDir( path );

    const reader = new GltfReader( this._ioImpl, path, baseurl );
    
    return this._ioImpl.loadBinaryResource( this._ioImpl.resolvePath( path, baseurl ) )
      .then( reader.parse )
    
  }

}




