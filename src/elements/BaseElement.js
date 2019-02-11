import Assert from '../lib/assert';

const _defs = {};

export default class BaseElement {

  static _registerDefinition( type, _Class ){
    Assert.isUndefined( _defs[type] )
    _defs[type] = _Class;
  }
  
  static getDefinition( type ){
    Assert.isDefined( _defs[type] )
    return _defs[type];
  }


  constructor( gltf, data ){
    this.gltf = gltf;

    this.name       = data.name;
    this.extras     = data.extras;
    this.extensions = data.extensions;

  }

  resolveReferences(){
    // abstract
  }
  
}
