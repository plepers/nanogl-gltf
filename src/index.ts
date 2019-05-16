
/// <


import Extensions  from './extensions'           ;
import Accessor    from './elements/Accessor'    ;
import BufferView  from './elements/BufferView'  ;
import Buffer      from './elements/Buffer'      ;
import Animation   from './elements/Animation'   ;
import Node        from './elements/Node'        ;
import Material    from './elements/Material'    ;
import Mesh        from './elements/Mesh'        ;
import Skin        from './elements/Skin'        ;
import Camera      from './elements/Camera'      ;
import BaseElement from './elements/BaseElement' ;

import { ElementType } from './consts';




/** Gltf file representation */
export default class Gltf{
  
  _url        : string
  _baseDir    : string
  _data       : any
  _extensions : Extensions
  

  _elements         : BaseElement[];

  _byType           : Map<ElementType, BaseElement[]>;

  constructor(){
    this._url        = null;
    this._data       = null;

    this._extensions = new Extensions();


    this._byType = new Map<ElementType, BaseElement[]>([
      [ElementType.BUFFER            , [] ],
      [ElementType.BUFFERVIEW        , [] ],
      [ElementType.ACCESSOR          , [] ],
      [ElementType.ANIMATION         , [] ],
      [ElementType.ANIMATION_SAMPLER , [] ],
      [ElementType.ANIMATION_CHANNEL , [] ],
      [ElementType.MESH              , [] ],
      [ElementType.PRIMITIVE         , [] ],
      [ElementType.NODE              , [] ],
      [ElementType.MATERIAL          , [] ],
    ])

    this._elements = []

  }


  get accessors():Accessor[]{
    return this._getTypeHolder<Accessor>(ElementType.ACCESSOR);
  }

  get animations():Animation[]{
    return this._getTypeHolder<Animation>(ElementType.ANIMATION);
  }

  get buffers():Buffer[]{
    return this._getTypeHolder<Buffer>(ElementType.BUFFER);
  }

  get bufferViews():BufferView[]{
    return this._getTypeHolder<BufferView>(ElementType.BUFFERVIEW);
  }


  _getTypeHolder<T extends BaseElement>( type : ElementType ) : T[] {
    return this._byType.get( type ) as T[];
  }
  

  getAllElements() : BaseElement[]{
    return this._elements;
  }


  addElement( element : BaseElement ){
    const a: BaseElement[] = this._getTypeHolder( element.elementType );
    if( a.indexOf( element ) === -1 ){
      a.push( element );
      this._elements.push( element );
    }
  }


 
  addElements( elements : BaseElement[] ){
    for (var e of elements) {
      this.addElement( e );
    }
  }

 
  getElement<T extends BaseElement>( type:ElementType, index:number ) : T {
    return this._getTypeHolder<T>(type)[index]; 
  }
 

  getElementByName<T extends BaseElement>( type:ElementType, name:string ) : T {
    const list : T[] = this._getTypeHolder<T>(type);
    for (var el of list) {
      if( el.name === name ) return el;
    }
    return null;
  }



}

