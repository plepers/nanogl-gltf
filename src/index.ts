
/// <


import ExtensionsRegistry, { IExtension, Extensions }  from './extensions';
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
import Asset       from './elements/Asset'       ;

import { ElementType } from './consts';
import BufferCache from './BufferCache';
import { GLContext } from 'nanogl/types';
import { ISemantics, DefaultSemantics } from './Semantics';




/** Gltf file representation */
export default class Gltf{
  
  
  static _extensions : ExtensionsRegistry = new ExtensionsRegistry();

  static addExtension( ext:IExtension ){
    Gltf._extensions.addExtension( ext );
  }


  _url        : string
  _baseDir    : string
  
  _elements   : BaseElement[];
  _byType     : Map<ElementType, BaseElement[]>;
  _extensions : Extensions;

  bufferCache : BufferCache;
  semantics   : ISemantics;

  asset : Asset;

  

  constructor(){
    this._url        = null;

    this._extensions = new Extensions(); 

    this._byType = new Map<ElementType, BaseElement[]>([
      [ElementType.BUFFER            , [] ],
      [ElementType.BUFFERVIEW        , [] ],
      [ElementType.ASSET             , [] ],
      [ElementType.ACCESSOR          , [] ],
      [ElementType.ANIMATION         , [] ],
      [ElementType.ANIMATION_SAMPLER , [] ],
      [ElementType.ANIMATION_CHANNEL , [] ],
      [ElementType.MESH              , [] ],
      [ElementType.PRIMITIVE         , [] ],
      [ElementType.NODE              , [] ],
      [ElementType.MATERIAL          , [] ],
      [ElementType.CAMERA            , [] ],
      [ElementType.SCENE             , [] ],
      [ElementType.SKIN              , [] ],
      [ElementType.TEXTURE           , [] ],
    ])

    this._elements = []

    this.semantics = new DefaultSemantics();

  }
  
  
  allocateGl( gl : GLContext ){
    
    this.bufferCache = new BufferCache( gl );

    for( const mesh of this.meshes ){
      mesh.allocateGl( gl );
    }

  }


  get buffers():Buffer[]{
    return this._getTypeHolder<Buffer>(ElementType.BUFFER);
  }

  get bufferViews():BufferView[]{
    return this._getTypeHolder<BufferView>(ElementType.BUFFERVIEW);
  }

  get accessors():Accessor[]{
    return this._getTypeHolder<Accessor>(ElementType.ACCESSOR);
  }

  get animations():Animation[]{
    return this._getTypeHolder<Animation>(ElementType.ANIMATION);
  }

  get meshes():Mesh[]{
    return this._getTypeHolder<Mesh>(ElementType.MESH);
  }

  get nodes():Node[]{
    return this._getTypeHolder<Node>(ElementType.NODE);
  }

  get materials():Material[]{
    return this._getTypeHolder<Material>(ElementType.MATERIAL);
  }

  get cameras():Camera[]{
    return this._getTypeHolder<Camera>(ElementType.CAMERA);
  }

  get skins():Skin[]{
    return this._getTypeHolder<Skin>(ElementType.SKIN);
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

