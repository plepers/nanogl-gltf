//@ts-check

import { TYPE_PRIMITIVE, TYPE_MATERIAL } from '../consts';
import BaseElement from './BaseElement';
import Ref from 'Ref';



class Attribute {

  constructor( semantic, accessor ){

    this.semantic = semantic;
    this.accessor = accessor;

  }

}

export default class Primitive extends BaseElement {

  static TYPE = TYPE_PRIMITIVE;

  constructor( gltf, data ){

    super( gltf, data );

    if( data.material )
      this.$material = new Ref( gltf, TYPE_MATERIAL, data.material );

    this.attributes = [];
    
  }
  

}

