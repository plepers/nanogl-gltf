

export default class Ref {

  constructor( gltf, type, index ){
    this.gltf  = gltf;
    this.type  = type;
    this.index = index;
  }

  resolve(){
    return this.gltf[this.type][this.index];
  }

}