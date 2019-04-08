//@flow

import { ElementType } from '../consts';
import BaseElement from './BaseElement';


import Gltf from '../index'
import Accessor from './Accessor'
import Material from './Material'

class Attribute {

  semantic : string;
  accessor : Accessor;

  constructor( semantic:string , accessor:Accessor ){

    this.semantic = semantic;
    this.accessor = accessor;

  }

}

export default class Primitive extends BaseElement {

  static TYPE :ElementType = ElementType.PRIMITIVE;
  
  material   : Material;
  attributes : Attribute[];


  constructor( gltf:Gltf, data:any ){

    super( gltf, data );

    if( data.material )
      this.material = this.gltf.getElement( ElementType.MATERIAL, data.material );


    this.attributes = [];
    for (const attrib in data.attributes ) { 
      const accessor:Accessor = this.gltf.getElement( ElementType.ACCESSOR, data.attributes[attrib] );
      this.attributes.push( new Attribute( attrib, accessor ) );
    }
    
  }
  

}

