//@ts-check

/**
 * @typedef {import("../index").default} Gltf
 */



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

  /**
   * @return {string} type identifier for this element
   */
  get elementType(){
    return this.constructor['TYPE'];
  }


  resolveReferences(){
    // abstract
  }
  
}
