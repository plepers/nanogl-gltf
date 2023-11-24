//@ts-check

import Assert from '../lib/assert';
import { IExtensionFactory, IExtensionInstance } from './IExtension';
import GltfLoader from '../io/GltfLoader';


/**
 * This class provides functionalities for managing a list of extensions
 */
export class ExtensionList {

  /**
   * Map of extensions by name
   */
  _map : Record<string,IExtensionInstance> = {};

  /**
   * Array of extensions
   */
  _list : IExtensionInstance[] = [];

  /**
   * Add an extension to the list, will throw if extension already exists
   * @param ext Extension to add
   */
  addExtension( ext : IExtensionInstance ){
    if( this._map[ext.name] !== undefined ){
      throw new Error(`Extension ${ext.name} already exits`);
    }
    this._map[ext.name]=ext;
    this._list.push( ext );
  }

  /**
   * Sort extensions _list by priority
   */
  sort(){
    this._list.sort( (a,b)=>b.priority-a.priority );
  }

  /**
   * Check if this list contains a list of given extensions
   * @param used List of used but not necessary extensions, will only warn if missing
   * @param required List of necessary extensions, will throw if missing
   */
  validate( used:string[] = [], required:string[] = [] ){
    for (const id of used) {
      if( this._map[id] === undefined ) console.warn(`Missing used extension ${id}`)
    }

    for (const id of required) {
      if( this._map[id] === undefined ) throw new Error(`Missing required extension ${id}`)
    }
  }

}


/**
 * This class manages all the extensions activated for Gltf processing (like KHR_texture_transform, EXT_texture_webp, ...)
 */
class ExtensionsRegistry {

  /**
   * Map of extensions factories by name
   */
  _extensionFactories : Record<string,IExtensionFactory>;

  constructor(){
    this._extensionFactories = {}
  }

  /**
   * Add an extension factory to the registry
   * @param ext Extension factory to add to the registry
   */
  addExtension( ext:IExtensionFactory ){
    const id:string = ext.name;
    Assert.isUndefined( this._extensionFactories[id], `extension '${id}' already exist` );
    this._extensionFactories[id] = ext;
  }
  
  /**
   * Setup extensions for a given loader, will create extension instances from extension factories
   * @param loader Loader to setup extensions for
   * @param additionalExtensions Additional extensions not yet added in the registry
   */
  setupExtensions( loader:GltfLoader, additionalExtensions : IExtensionFactory[] = [] ) : void {
    const res = loader._extensions;
    
    for( const extName in this._extensionFactories ){
      const extInstance = this._extensionFactories[extName].createInstance( loader );
      Assert.isTrue( extInstance.name === extName );
      res.addExtension( extInstance );
    }

    for (const ext of additionalExtensions) {
      const extInstance = ext.createInstance( loader );
      res.addExtension( extInstance );
    }

    res.sort();
    

    
  }

}

export default ExtensionsRegistry;