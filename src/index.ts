
/// <


import ExtensionsRegistry from './extensions/Registry';

import Accessor from './elements/Accessor';
import BufferView from './elements/BufferView';
import Buffer from './elements/Buffer';
import Animation from './elements/Animation';
import Node from './elements/Node';
import Material from './elements/Material';
import Mesh from './elements/Mesh';
import Skin from './elements/Skin';
import Camera from './elements/Camera';
import Asset from './elements/Asset';

import BufferCache from './BufferCache';
import { GLContext } from 'nanogl/types';
import { ISemantics, DefaultSemantics } from './Semantics';
import { IExtensionFactory } from './extensions/IExtension';
import GltfTypes from './types/GltfTypes';
import { AnyElement, ElementOfType } from './types/Elements';
import IRenderable from './renderer/IRenderable';
import Assert from './lib/assert';




/** Gltf file representation */
export default class Gltf {


  static _extensionsRegistry: ExtensionsRegistry = new ExtensionsRegistry();
  
  static addExtension(ext: IExtensionFactory) {
    Gltf._extensionsRegistry.addExtension(ext);
  }
  
  
  
  _url: string
  _baseDir: string
  
  private _elements: AnyElement[];
  private _byType: Map<GltfTypes, AnyElement[]>;
  renderables: IRenderable[];

  bufferCache: BufferCache;
  semantics: ISemantics;


  constructor( ) {
    this._url = null;


    this._byType = new Map<GltfTypes, AnyElement[]>([

      [GltfTypes.ACCESSOR               , []],
      [GltfTypes.ACCESSOR_SPARSE        , []],
      [GltfTypes.ACCESSOR_SPARSE_INDICES, []],
      [GltfTypes.ACCESSOR_SPARSE_VALUES , []],
      [GltfTypes.ANIMATION              , []],
      [GltfTypes.ANIMATION_SAMPLER      , []],
      [GltfTypes.ANIMATION_CHANNEL      , []],
      [GltfTypes.ASSET                  , []],
      [GltfTypes.BUFFER                 , []],
      [GltfTypes.BUFFERVIEW             , []],
      [GltfTypes.CAMERA                 , []],
      [GltfTypes.IMAGE                  , []],
      [GltfTypes.MATERIAL               , []],
      [GltfTypes.MESH                   , []],
      [GltfTypes.NODE                   , []],
      [GltfTypes.NORMAL_TEXTURE_INFO    , []],
      [GltfTypes.OCCLUSION_TEXTURE_INFO , []],
      [GltfTypes.PRIMITIVE              , []],
      [GltfTypes.SAMPLER                , []],
      [GltfTypes.SCENE                  , []],
      [GltfTypes.SKIN                   , []],
      [GltfTypes.TEXTURE                , []],
      [GltfTypes.TEXTURE_INFO           , []],

    ])

    this._elements = []

    this.semantics = new DefaultSemantics();

  }


  async allocateGl(gl: GLContext): Promise<any> {

    this.bufferCache = new BufferCache(gl);


    const allocPromises: Promise<any>[] = []
    for (const element of this._elements) {
      const p = element.allocateGl(gl);
      p ?? allocPromises.push(p as Promise<any>);
    }

    await Promise.all(allocPromises);

    this.renderables = this.nodes
      .filter( n=>n.renderable!==undefined )
      .map( n=>n.renderable );

  }


  get buffers(): Buffer[] {
    return this._getTypeHolder(GltfTypes.BUFFER);
  }

  get bufferViews(): BufferView[] {
    return this._getTypeHolder(GltfTypes.BUFFERVIEW);
  }

  get accessors(): Accessor[] {
    return this._getTypeHolder(GltfTypes.ACCESSOR);
  }

  get animations(): Animation[] {
    return this._getTypeHolder(GltfTypes.ANIMATION);
  }

  get meshes(): Mesh[] {
    return this._getTypeHolder(GltfTypes.MESH);
  }

  get nodes(): Node[] {
    return this._getTypeHolder(GltfTypes.NODE);
  }

  get materials(): Material[] {
    return this._getTypeHolder(GltfTypes.MATERIAL);
  }

  get cameras(): Camera[] {
    return this._getTypeHolder(GltfTypes.CAMERA);
  }

  get skins(): Skin[] {
    return this._getTypeHolder(GltfTypes.SKIN);
  }


  _getTypeHolder<T extends GltfTypes>(type: T): ElementOfType<T>[] {
    return this._byType.get(type) as ElementOfType<T>[];
  }


  getAllElements(): AnyElement[] {
    return this._elements;
  }


  addElement(element: AnyElement) {
    const a: AnyElement[] = this._getTypeHolder(element.gltftype);
    if( element.elementIndex>-1 )
      a[element.elementIndex] = element;
    this._elements.push(element);
  }



  addElements(elements: AnyElement[]) {
    for (var e of elements) {
      this.addElement(e);
    }
  }

  getElement<T extends GltfTypes>(type: T, index: number): ElementOfType<T> {
    return this._getTypeHolder(type)[index];
  }


  getElementByName<T extends GltfTypes>(type: T, name: string): ElementOfType<T> {
    const list = this._getTypeHolder(type);
    for (var el of list) {
      if (el.name === name) return el;
    }
    return null;
  }



}

