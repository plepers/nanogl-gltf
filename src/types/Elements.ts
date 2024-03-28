import Accessor             from "../elements/Accessor"             ;
import Asset                from "../elements/Asset";
import Buffer               from "../elements/Buffer"               ;
import BufferView           from "../elements/BufferView"           ;
import Camera               from "../elements/Camera"               ;
import { IMaterial }             from "../elements/Material"             ;
import Mesh                 from "../elements/Mesh"                 ;
import Primitive            from "../elements/Primitive"            ;
import Skin                 from "../elements/Skin"                 ;
import Animation            from "../elements/Animation"     ;
import AnimationChannel     from "../elements/AnimationChannel"     ;
import AnimationSampler     from "../elements/AnimationSampler"     ;
import NormalTextureInfo    from "../elements/NormalTextureInfo"    ;
import OcclusionTextureInfo from "../elements/OcclusionTextureInfo" ;
import Sampler              from "../elements/Sampler"              ;
import Scene                from "../elements/Scene"                ;
import Texture              from "../elements/Texture"              ;
import TextureInfo          from "../elements/TextureInfo"          ;
import Image                from "../elements/Image";
import Node                 from "../elements/Node";

import Gltf2 from "./Gltf2";
import GltfTypes from "./GltfTypes";
import AccessorSparse from "../elements/AccessorSparse";
import AccessorSparseIndices from "../elements/AccessorSparseIndices";
import AccessorSparseValues from "../elements/AccessorSparseValues";
import GltfLoader from "../io/GltfLoader";
import { GLContext } from "nanogl/types";


/**
 * Interface that every Gltf element must implement (Buffer, Accessor, Mesh, ...)
 */
export interface IElement {
  
  /**
   * Type of this element
   */
  readonly gltftype : GltfTypes

  /**
   * Name of this element
   */
  name        : undefined | string

  /**
   * Extras of this element (custom additional data that can be added to every gltf property)
   */
  extras      : any   
  
  /**
   * Method called by the loader just after initialization to parse the data coming from the .gltf file and setup the element accordingly.
   * 
   * For example, if it's a Buffer it will load the buffer data from the given uri and store it, if it's a Camera it will create the corresponding lens.
   * @param gltfLoader Element's loader, it can be used to load other elements (for example a Mesh could load its Primitives, a Material could load its textures).
   * @param data Data coming from the .gltf file
   */
  parse( gltfLoader : GltfLoader, data : Gltf2.IProperty ) : Promise<any>
  
}

/**
 * Type that wraps all possible Gltf elements, they all implements IElement and represents a GltfType
 */
export type AnyElement = 
  Accessor              |
  AccessorSparse        |
  AccessorSparseIndices |
  AccessorSparseValues  |
  Animation             |
  AnimationChannel      |
  AnimationSampler      |
  Asset                 |
  Buffer                |
  BufferView            |
  Camera                |
  Image                 |
  IMaterial             |
  Mesh                  |
  Node                  |
  NormalTextureInfo     |
  OcclusionTextureInfo  |
  Primitive             |
  Sampler               |
  Scene                 |
  Skin                  |
  Texture               |
  TextureInfo           ;
  
  // PbrMetallicRoughness  |
  

/**
 * Gltf element determined by its GltfType
 * @typeParam T GltfType of the element
 * @typeParam E Corresponding Gltf element returned
 */
export type ElementOfType<T extends GltfTypes, E extends AnyElement = AnyElement> = E extends { gltftype : T } ? E : never;

/**
 * Gltf property determined by its GltfType
 * @typeParam T GltfType of the element
 * @typeParam E Corresponding Gltf property returned
 */
export type PropertyOfType<T extends GltfTypes, E extends Gltf2.Property = Gltf2.Property> = E extends { gltftype : T } ? E : never;


/**
 * Gltf type determined by a given Gltf property
 * @typeParam T Gltf property
 * @typeParam E Corresponding Gltf type returned
 */
export type PropertyType<T extends Gltf2.Property> = T extends { gltftype : infer E } ? E : never;

/**
 * Gltf type determined by a given Gltf element
 * @typeParam T Gltf element
 * @typeParam E Corresponding Gltf type returned
 */
export type ElementType<T extends AnyElement> = T extends { gltftype : infer E } ? E : never;


/**
 * Gltf element determined by a given Gltf property
 * @typeParam T Gltf property
 */
export type ElementForProperty        <T extends Gltf2.Property> = ElementOfType<PropertyType<T>>

/**
 * Gltf element determined by a given Gltf property, wrapped in a Promise
 * @typeParam T Gltf property
 */
export type PromiseElementForProperty <T extends Gltf2.Property> = Promise<ElementOfType<PropertyType<T>>>

