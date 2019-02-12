//@ts-check
/**
 * @typedef {import("./index").default} Gltf
 * @typedef {import("./elements/BaseElement").default} BaseElement
 */

export default class Ref {

  /**
   * 
   * @param {Gltf} gltf 
   * @param {string} type 
   * @param {number} index 
   */
  constructor( gltf, type, index ){
    this.gltf  = gltf;
    this.type  = type;
    this.index = index;
  }

  /**
   */
  resolve(){
    return this.gltf[this.type][this.index];
  }

}