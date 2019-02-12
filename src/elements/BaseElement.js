/**
 * @typedef {import("../index").default} Gltf
 */

 import Assert from '../lib/assert';

const _defs = {};





export default class BaseElement {

  static TYPE = 'toto';

  /**
   * 
   * @param {Gltf} gltf 
   * @param {any} data 
   */
  constructor( gltf, data ){
    this.gltf = gltf;

    this.name       = data.name;
    this.extras     = data.extras;
    this.extensions = data.extensions;

  }

  get elementType(){
    return this.constructor.TYPE;
  }

  resolveReferences(){
    // abstract
  }
  
}
