//@flow

import { TYPE_PRIMITIVE, TYPE_MATERIAL, TYPE_ACCESSOR } from '../consts';
import BaseElement from './BaseElement';


import type Gltf from '../index'
import type Accessor from './Accessor'
import type Material from './Material'

class Attribute {

  semantic : string;
  accessor : Accessor;

  constructor( semantic:string , accessor:Accessor ){

    this.semantic = semantic;
    this.accessor = accessor;

  }

}

export default class Primitive extends BaseElement {

  static TYPE = TYPE_PRIMITIVE;
  
  material   : ?Material;
  attributes : Attribute[];


  constructor( gltf:Gltf, data:any ){

    super( gltf, data );

    if( data.material )
      this.material = this.gltf.getElement( TYPE_MATERIAL, data.material );


    this.attributes = [];
    for (const attrib in data.attributes ) { 
      const accessor:Accessor = this.gltf.getElement( TYPE_ACCESSOR, data.attributes[attrib] );
      this.attributes.push( new Attribute( attrib, accessor ) );
    }
    
  }
  

}

