//@ts-check

import Assert from './lib/assert';
import Gltf from '.';


export interface IExtensionInstance {

  setGltf( gltf : Gltf ) : void;

  preParse( datas : any )  : void;
  postParse( datas : any ) : void;

}


export interface IExtension {

  getName() : string;

  getInstance( gltf : Gltf ) : IExtensionInstance;

}

export class Extensions {

  _list : Record<string,IExtensionInstance>;

}


class ExtensionsRegistry {

  _list : Record<string,IExtension>;

  constructor(){
    this._list = {}
  }

  addExtension( ext:IExtension ){
    const id:string = ext.getName();
    Assert.isUndefined( this._list[id], `extension '${id}' already exist` );
    this._list[id] = ext;
  }

  setupExtensions( gltf:Gltf, used:string[] = [], required:string[] = [] ) : void {
    const res = gltf._extensions;

    for (const id of used) {
      const e = this._list[id];
      if( e !== undefined ){
        res._list[id] = e.getInstance( gltf );
      } else if( required.includes(id) ){
        // throw error?
        throw new Error( `Missing required extension ${id}` );
      }
    }
  }

}

export default ExtensionsRegistry;