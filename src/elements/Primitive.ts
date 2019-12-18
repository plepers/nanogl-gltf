

import { ElementType, PrimitiveMode } from '../consts';
import BaseElement from './BaseElement';


import Gltf from '../index'
import Accessor from './Accessor'
import Material from './Material'
import { Data_MeshPrimitive } from '../schema/glTF';


class Attribute {

  semantic : string;
  accessor : Accessor;

  constructor( semantic:string , accessor:Accessor ){
    this.semantic = semantic;
    this.accessor = accessor;
  }

}




class AttributesSet {

  
  _attributes: Attribute[];

  constructor(){
    this._attributes = [];
  }


  get length() :number {
    return this._attributes.length;
  }

  add( attribute : Attribute ){
    this._attributes.push( attribute );
  }


  getSemantic( semantic : string ) : Attribute {
    for (var a of this._attributes ) {
      if( a.semantic === semantic ) return a;
    }
    return null;
  }



  // return attribs by bufferView
  getBuffersViewSets() : AttributesSet[] {

    const map : Map<number, AttributesSet> = new Map();

    for (var a of this._attributes ) {
      var bId = a.accessor.bufferView.uid;
      if( !map.has( bId ) ){
        map.set( bId, new AttributesSet() );
      }
      map.get( bId ).add( a );
    }

    return Array.from( map.values() );
  }


}





export default class Primitive extends BaseElement {

  static TYPE :ElementType = ElementType.PRIMITIVE;
  
  material   : Material;
  attributes : AttributesSet;
  indices    : Accessor;
  mode       : PrimitiveMode;
  targets    : AttributesSet[];


  parse( gltf:Gltf, data:Data_MeshPrimitive ){

    super.parse( gltf, data );

    
    this.attributes = new AttributesSet();
    this.parseAttributeSet( this.attributes, data.attributes );

    
    if( data.indices !== undefined )
      this.indices = gltf.getElement( ElementType.ACCESSOR, data.indices );

    if( data.material !== undefined )
      this.material = gltf.getElement( ElementType.MATERIAL, data.material );

    if( data.mode !== undefined)
      this.mode = data.mode;
    else
      this.mode = PrimitiveMode.DEFAULT;

    if( data.targets !== undefined ){
      this.targets = [];

      for (var tgt of data.targets ) {
        const aset = new AttributesSet();
        this.parseAttributeSet( aset, tgt );
        this.targets.push( aset );
      }
    }


  }


  parseAttributeSet( aset : AttributesSet, data : any ) {
    
    for (const attrib in data ) { 
      const accessor:Accessor = this.gltf.getElement( ElementType.ACCESSOR, data[attrib] );
      aset.add( new Attribute( attrib, accessor ) );
    }

  }

  

}

