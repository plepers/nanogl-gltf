
/// <


import ExtensionsRegistry from './extensions/Registry';

import type Accessor from './elements/Accessor';
import type BufferView from './elements/BufferView';
import type Buffer from './elements/Buffer';
import type Animation from './elements/Animation';
import type Node from './elements/Node';
import type { IMaterial } from './elements/Material';
import type Mesh from './elements/Mesh';
import type Skin from './elements/Skin';
import type Camera from './elements/Camera';

import { GLContext } from 'nanogl/types';
import { ISemantics, DefaultSemantics } from './Semantics';
import { IExtensionFactory } from './extensions/IExtension';
import GltfTypes from './types/GltfTypes';
import { AnyElement, ElementOfType, IElement } from './types/Elements';
import IRenderable from './renderer/IRenderable';
import Assert from './lib/assert';




/** Gltf file representation */
export default class Gltf {


  private static _extensionsRegistry: ExtensionsRegistry = new ExtensionsRegistry();
  private static _semantics : ISemantics = new DefaultSemantics();
  
  static addExtension(ext: IExtensionFactory) {
    Gltf._extensionsRegistry.addExtension(ext);
  }

  static getSemantics():ISemantics {
    return this._semantics;
  }

  static getExtensionsRegistry(): ExtensionsRegistry {
    return this._extensionsRegistry;
  }
  

  
  
  private _elements: AnyElement[];
  private _byType: Map<GltfTypes, AnyElement[]>;
  renderables: IRenderable[];



  constructor( ) {

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

  }


  async allocateGl(gl: GLContext): Promise<any> {

    const allocPromises: Promise<any>[] = []
    for (const element of <IElement[]>this._elements) {
      const p = element.allocateGl?.(gl);
      p ?? allocPromises.push(p as Promise<any>);
    }

    await Promise.all(allocPromises);

    this.renderables = this.nodes
    .map( n=>n.renderable )
    .filter( n=>n!==undefined )

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

  get materials(): IMaterial[] {
    return this._getTypeHolder(GltfTypes.MATERIAL);
  }

  get cameras(): Camera[] {
    return this._getTypeHolder(GltfTypes.CAMERA);
  }

  get skins(): Skin[] {
    return this._getTypeHolder(GltfTypes.SKIN);
  }

  
  
  
  getAllElements(): AnyElement[] {
    return this._elements;
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

  
  private _getTypeHolder<T extends GltfTypes>(type: T): ElementOfType<T>[] {
    return this._byType.get(type) as ElementOfType<T>[];
  }
  
  addElement(element: AnyElement, index : number = -1 ) {
    if( index>-1 ){
      const a: AnyElement[] = this._getTypeHolder(element.gltftype);
      a[index] = element;
    }
    this._elements.push(element);
  }



  addElements(elements: AnyElement[]) {
    for (var e of elements) {
      this.addElement(e);
    }
  }


}

