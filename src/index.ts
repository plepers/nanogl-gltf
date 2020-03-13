
/// <


import ExtensionsRegistry from './extensions/Registry';

import Accessor    from './elements/Accessor'    ;
import BufferView  from './elements/BufferView'  ;
import Buffer      from './elements/Buffer'      ;
import Animation   from './elements/Animation'   ;
import Node        from './elements/Node'        ;
import Material    from './elements/Material'    ;
import Mesh        from './elements/Mesh'        ;
import Skin        from './elements/Skin'        ;
import Camera      from './elements/Camera'      ;
import Asset       from './elements/Asset'       ;

import BufferCache from './BufferCache';
import { GLContext } from 'nanogl/types';
import { ISemantics, DefaultSemantics } from './Semantics';
import { IExtensionFactory } from './extensions/IExtension';
import GltfTypes from './types/GltfTypes';
import { AnyElement } from './types/Elements';




/** Gltf file representation */
export default class Gltf{
  
  
  static _extensionsRegistry : ExtensionsRegistry = new ExtensionsRegistry();

  static addExtension( ext:IExtensionFactory ){
    Gltf._extensionsRegistry.addExtension( ext );
  }



  _url        : string
  _baseDir    : string
  
  _elements   : AnyElement[];
  _byType     : Map<GltfTypes, AnyElement[]>;

  bufferCache : BufferCache;
  semantics   : ISemantics;

  asset : Asset;

  

  constructor(){
    this._url        = null;


    this._byType = new Map<GltfTypes, AnyElement[]>([

      [GltfTypes.ACCESSOR                , [] ],
      [GltfTypes.ACCESSOR_SPARSE         , [] ],
      [GltfTypes.ACCESSOR_SPARSE_INDICES , [] ],
      [GltfTypes.ACCESSOR_SPARSE_VALUES  , [] ],
      [GltfTypes.ANIMATION               , [] ],
      [GltfTypes.ANIMATION_SAMPLER       , [] ],
      [GltfTypes.ANIMATION_CHANNEL       , [] ],
      [GltfTypes.ASSET                   , [] ],
      [GltfTypes.BUFFER                  , [] ],
      [GltfTypes.BUFFERVIEW              , [] ],
      [GltfTypes.CAMERA                  , [] ],
      [GltfTypes.IMAGE                   , [] ],
      [GltfTypes.MATERIAL                , [] ],
      [GltfTypes.MESH                    , [] ],
      [GltfTypes.NODE                    , [] ],
      [GltfTypes.NORMAL_TEXTURE_INFO     , [] ],
      [GltfTypes.OCCLUSION_TEXTURE_INFO  , [] ],
      [GltfTypes.PRIMITIVE               , [] ],
      [GltfTypes.SAMPLER                 , [] ],
      [GltfTypes.SCENE                   , [] ],
      [GltfTypes.SKIN                    , [] ],
      [GltfTypes.TEXTURE                 , [] ],
      [GltfTypes.TEXTURE_INFO            , [] ],

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
    return this._getTypeHolder<Buffer>(GltfTypes.BUFFER);
  }

  get bufferViews():BufferView[]{
    return this._getTypeHolder<BufferView>(GltfTypes.BUFFERVIEW);
  }

  get accessors():Accessor[]{
    return this._getTypeHolder<Accessor>(GltfTypes.ACCESSOR);
  }

  get animations():Animation[]{
    return this._getTypeHolder<Animation>(GltfTypes.ANIMATION);
  }

  get meshes():Mesh[]{
    return this._getTypeHolder<Mesh>(GltfTypes.MESH);
  }

  get nodes():Node[]{
    return this._getTypeHolder<Node>(GltfTypes.NODE);
  }

  get materials():Material[]{
    return this._getTypeHolder<Material>(GltfTypes.MATERIAL);
  }

  get cameras():Camera[]{
    return this._getTypeHolder<Camera>(GltfTypes.CAMERA);
  }

  get skins():Skin[]{
    return this._getTypeHolder<Skin>(GltfTypes.SKIN);
  }


  _getTypeHolder<T extends AnyElement>( type : GltfTypes ) : T[] {
    return this._byType.get( type ) as T[];
  }
  

  getAllElements() : AnyElement[]{
    return this._elements;
  }


  addElement( element : AnyElement ){
    const a: AnyElement[] = this._getTypeHolder( element.gltftype );
    a[element.elementIndex] = element;
  }


 
  addElements( elements : AnyElement[] ){
    for (var e of elements) {
      this.addElement( e );
    }
  }

 
  getElement<T extends AnyElement>( type:GltfTypes, index:number ) : T {
    return this._getTypeHolder<T>(type)[index]; 
  }
 

  getElementByName<T extends AnyElement>( type:GltfTypes, name:string ) : T {
    const list : T[] = this._getTypeHolder<T>(type);
    for (var el of list) {
      if( el.name === name ) return el;
    }
    return null;
  }



}

