
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


import NanoCamera from 'nanogl-camera';
import { GLContext } from 'nanogl/types';
import NanoglNode from 'nanogl-node';
import { ISemantics, DefaultSemantics } from './Semantics';
import { IExtensionFactory } from './extensions/IExtension';
import GltfTypes from './types/GltfTypes';
import { AnyElement, ElementOfType } from './types/Elements';
import IRenderConfig, { DefaultRenderConfig } from './IRenderConfig';
import Primitive from './elements/Primitive';
import Texture from './elements/Texture';
import DepthPass from 'nanogl-pbr/DepthPass';
import MeshRenderer from './renderer/MeshRenderer';
import { LightCollection } from './extensions/KHR_lights_punctual';
import { AbortError, AbortSignal } from '@azure/abort-controller';


/**
 * Collection of elements of a given type
 */
export class ElementCollection<T extends AnyElement = AnyElement>{
  
  // private _byNames : Map<string, T> = new Map()

  /**
   * Array of elements order by specified index
   */
  indexed : T[] = []

  /**
   * Array of elements ordered by push order
   */
  list :  T[] = []
  
  /**
   * Add an element to the collection
   * @param element Element to add
   * @param index Index of the element, if -1 or not specified, will not be pushed to indexed array
   */
  addElement(element: T, index  = -1 ){
    if(index>-1) this.indexed[index] = element  ;
    this.list.push( element);
  }

}

/**
 * Extras property of a Gltf (custom additional data that can be added to every gltf property).
 * Lights can be stored in the extras property of the Gltf with the KHR_lights_punctual extension.
 */
export type GltfExtras = {
  [key: string]: any;
} & {
  lights?: LightCollection
}

/**
 * Gltf file representation
 */
export default class Gltf {

  /**
   * Static registry of activated extensions for all Gltf instances
   */
  private static _extensionsRegistry: ExtensionsRegistry = new ExtensionsRegistry();

  /**
   * Static GLSL semantics' resolver for all Gltf instances
   */
  private static _semantics    : ISemantics = new DefaultSemantics();

  /**
   * Static render config for all Gltf instances
   */
  private static _renderConfig : IRenderConfig = DefaultRenderConfig();

    


  /**
   * Add an extension to the static Gltf's extensions registry
   * @param ext Extension to add
   */
  static addExtension(ext: IExtensionFactory) {
    Gltf._extensionsRegistry.addExtension(ext);
  }

  /**
   * Get the static Gltf's semantics resolver
   */
  static getSemantics():ISemantics {
    return this._semantics;
  }

  /**
   * Set a custom static Gltf's semantics resolver
   * @param semantics Custom semantics resolver
   */
  static setSemantics(semantics:ISemantics) {
    semantics ?? (this._semantics = semantics);
  }

  /**
   * Set the static Gltf's render config
   */
  static getRenderConfig() : IRenderConfig {
    return this._renderConfig;
  }

  /**
   * Get the static Gltf's extensions registry
   */
  static getExtensionsRegistry(): ExtensionsRegistry {
    return this._extensionsRegistry;
  }
  

  /**
   * Array of all elements of this Gltf, unordered
   */
  private _elements: AnyElement[];

  /**
   * Map of all elements of this Gltf, ordered in typed collections
   */
  private _collections: Map<GltfTypes, ElementCollection>;

  /**
   * Root node of this Gltf
   */
  readonly root : NanoglNode = new NanoglNode();

  /**
   * GL context of this Gltf
   */
  gl: GLContext

  /**
   * Array of all renderables of this Gltf, created as MeshRenderer
   */
  renderables: MeshRenderer[];

  /**
   * Array of all cameras of this Gltf, created as Camera from nanogl-camera
   */
  cameraInstances: NanoCamera[]

  /**
   * Depth pass of this Gltf
   */
  depthPass : DepthPass

  /**
   * Extras property of this Gltf (custom additional data that can be added to every gltf property)
   */
  extras : GltfExtras = {}

  constructor( ) {

    this._collections = new Map<GltfTypes, ElementCollection>([

      [GltfTypes.ACCESSOR               , new ElementCollection()],
      [GltfTypes.ACCESSOR_SPARSE        , new ElementCollection()],
      [GltfTypes.ACCESSOR_SPARSE_INDICES, new ElementCollection()],
      [GltfTypes.ACCESSOR_SPARSE_VALUES , new ElementCollection()],
      [GltfTypes.ANIMATION              , new ElementCollection()],
      [GltfTypes.ANIMATION_SAMPLER      , new ElementCollection()],
      [GltfTypes.ANIMATION_CHANNEL      , new ElementCollection()],
      [GltfTypes.ASSET                  , new ElementCollection()],
      [GltfTypes.BUFFER                 , new ElementCollection()],
      [GltfTypes.BUFFERVIEW             , new ElementCollection()],
      [GltfTypes.CAMERA                 , new ElementCollection()],
      [GltfTypes.IMAGE                  , new ElementCollection()],
      [GltfTypes.MATERIAL               , new ElementCollection()],
      [GltfTypes.MESH                   , new ElementCollection()],
      [GltfTypes.NODE                   , new ElementCollection()],
      [GltfTypes.NORMAL_TEXTURE_INFO    , new ElementCollection()],
      [GltfTypes.OCCLUSION_TEXTURE_INFO , new ElementCollection()],
      [GltfTypes.PRIMITIVE              , new ElementCollection()],
      [GltfTypes.SAMPLER                , new ElementCollection()],
      [GltfTypes.SCENE                  , new ElementCollection()],
      [GltfTypes.SKIN                   , new ElementCollection()],
      [GltfTypes.TEXTURE                , new ElementCollection()],
      [GltfTypes.TEXTURE_INFO           , new ElementCollection()],

    ])

    this._elements = []

  }

  /**
   * Get the Gltf ready to be used in a WebGL context.
   * Generally the first method called after loading the Gltf.
   * This will allocate all the needed textures to the GPU, create the renderables, cameras, initialize buffers for primitives,
   * and create Cameras from nanogl-camera.
   * @param gl GL context
   * @param abortSignal Abort signal if you want to be able to cancel the request at any time
   */
  async allocate(gl: GLContext, abortSignal:AbortSignal = AbortSignal.none ): Promise<void> {
    this.gl = gl


    this.depthPass = new DepthPass( gl );
    this.depthPass.depthFormat.set("D_RGB");

    for(const tex of this.textures) {
      await tex.allocateGl(gl)
      if( abortSignal.aborted ) throw new AbortError('Aborted')
    }

    this.primitives.forEach(p=>p.allocateGl(gl))
    this.nodes.forEach(n=>n.allocateGl(this) )


    this.renderables = this.nodes
      .map( n=>n.renderable )
      .filter( n=>n!==undefined )

      
    for (const node of this.nodes) {
      if( !node._parent ){
        this.root.add( node );
      }
    }

    this.createCameras();

  }


  /**
   * Filter all gltf Nodes to get only the ones that are cameras, and create a Camera from nanogl-camera for each of them,
   * added as child of the Node, storing them in cameraInstances
   */
  createCameras() {
    this.cameraInstances = this.nodes
      .filter( n=>n.camera!==undefined )
      .map( n=> {
        const cam = new NanoCamera( n.camera.lens )
        n.add( cam );
        return cam
       } )
      
  }


  get buffers    (): Buffer    [] {return this._getCollection(GltfTypes.BUFFER    ).list;}
  get bufferViews(): BufferView[] {return this._getCollection(GltfTypes.BUFFERVIEW).list;}
  get accessors  (): Accessor  [] {return this._getCollection(GltfTypes.ACCESSOR  ).list;}
  get animations (): Animation [] {return this._getCollection(GltfTypes.ANIMATION ).list;}
  get meshes     (): Mesh      [] {return this._getCollection(GltfTypes.MESH      ).list;}
  get nodes      (): Node      [] {return this._getCollection(GltfTypes.NODE      ).list;}
  get materials  (): IMaterial [] {return this._getCollection(GltfTypes.MATERIAL  ).list;}
  get cameras    (): Camera    [] {return this._getCollection(GltfTypes.CAMERA    ).list;}
  get skins      (): Skin      [] {return this._getCollection(GltfTypes.SKIN      ).list;}
  get primitives (): Primitive [] {return this._getCollection(GltfTypes.PRIMITIVE ).list;}
  get textures   (): Texture   [] {return this._getCollection(GltfTypes.TEXTURE   ).list;}
  
  /**
   * Get all elements of this Gltf, unordered and unfiltered
   */
  getAllElements(): AnyElement[] {
    return this._elements;
  }
  
  /**
   * Get element by his type and index
   * @param type Element's type
   * @param index Element's index
   */
  getElement<T extends GltfTypes>(type: T, index: number): ElementOfType<T> {
    return this._getCollection(type).indexed[index];
  }
  
  /**
   * Get element by his type and name
   * @param type Element's type
   * @param name Element's name
   */
  getElementByName<T extends GltfTypes>(type: T, name: string): ElementOfType<T> {
    const list = this._getCollection(type).list;
    for (const el of list) {
      if (el.name === name) return el;
    }
    return null;
  }

  /**
   * Get all elements of a specific type with a specific name
   * @param type Elements' type
   * @param name Elements' name
   */
  getElementsByName<T extends GltfTypes>(type: T, name: string): ElementOfType<T>[] {
    const list = this._getCollection(type).list;
    const ouput : ElementOfType<T>[] = [];
    for (const el of list) {
      if (el.name === name) ouput.push(el);
    }
    return ouput;
  }

  getNode     ( name:string ): Node      { return this.getElementByName( GltfTypes.NODE     , name ) }
  getMesh     ( name:string ): Mesh      { return this.getElementByName( GltfTypes.MESH     , name ) }
  getMaterial ( name:string ): IMaterial { return this.getElementByName( GltfTypes.MATERIAL , name ) }
  getAnimation( name:string ): Animation { return this.getElementByName( GltfTypes.ANIMATION, name ) }

  /**
   * Get full collection of a specific type
   * @param type Type of targeted collection
   */
  private _getCollection<T extends GltfTypes>(type: T): ElementCollection<ElementOfType<T>> {
    return this._collections.get(type) as ElementCollection<ElementOfType<T>>;
  }
  
  /**
   * Add an element to the Gltf
   * @param element Element to add
   * @param index Index of the element, if -1 or not specified, will not be pushed to indexed array (only the unordered one)
   */
  addElement(element: AnyElement, index  = -1 ) {
    const collection = this._getCollection( element.gltftype );
    collection.addElement( element, index );
    this._elements.push(element);
  }

}
