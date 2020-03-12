//@ts-check

import Assert from '../lib/assert';
import { IExtensionFactory, IExtensionInstance } from './IExtension';
import GltfLoader from '../io/GltfLoader';



export class ExtensionList {

  _map : Record<string,IExtensionInstance>;
  _list : IExtensionInstance[];

  addExtension( ext : IExtensionInstance ){
    this._map[ext.name]=ext;
    this._list.push( ext );
  }


  sort(){
    this._list.sort( (a,b)=>a.order-b.order );
  }


  validate( used:string[] = [], required:string[] = [] ){
    for (const id of used) {
      if( this._map[id] === undefined ) console.warn(`Missing used extension ${id}`)
    }

    for (const id of required) {
      if( this._map[id] === undefined ) throw new Error(`Missing required extension ${id}`)
    }
  }

}



class ExtensionsRegistry {

  _extensionFactories : Record<string,IExtensionFactory>;

  constructor(){
    this._extensionFactories = {}
  }

  addExtension( ext:IExtensionFactory ){
    const id:string = ext.name;
    Assert.isUndefined( this._extensionFactories[id], `extension '${id}' already exist` );
    this._extensionFactories[id] = ext;
  }
  
  setupExtensions( loader:GltfLoader, used:string[] = [], required:string[] = [] ) : void {
    const res = loader._extensions;
    
    for( const extName in this._extensionFactories ){
      const extInstance = this._extensionFactories[extName].createInstance( loader );
      Assert.isTrue( extInstance.name === extName );
      res.addExtension( extInstance );
    }

    res.sort();
    
  }

}

export default ExtensionsRegistry;