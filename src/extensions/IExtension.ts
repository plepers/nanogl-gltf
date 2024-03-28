// import Accessor             from "../elements/Accessor"             ;
// import AnimationChannel     from "../elements/AnimationChannel"     ;
// import AnimationSampler     from "../elements/AnimationSampler"     ;
// import BufferView           from '../elements/BufferView'           ;
// import Buffer               from '../elements/Buffer'               ;
// import Animation            from '../elements/Animation'            ;
// import Node                 from '../elements/Node'                 ;
// import Material             from '../elements/Material'             ;
// import Mesh                 from '../elements/Mesh'                 ;
// import Skin                 from '../elements/Skin'                 ;
// import Camera               from '../elements/Camera'               ;
// import BaseElement          from '../elements/BaseElement'          ;
// import Image                from '../elements/Image'                ;
// import Asset                from '../elements/Asset'                ;
// import Primitive            from "../elements/Primitive"            ;
// import NormalTextureInfo    from "../elements/NormalTextureInfo"    ;
// import OcclusionTextureInfo from "../elements/OcclusionTextureInfo" ;
// import PbrMetallicRoughness from "../elements/PbrMetallicRoughness" ;
// import Sampler              from "../elements/Sampler"              ;
// import Scene                from "../elements/Scene"                ;
// import Texture              from "../elements/Texture"              ;
// import TextureInfo          from "../elements/TextureInfo"          ;

import GltfLoader from "../io/GltfLoader";
import Gltf2 from "../types/Gltf2";
import { ElementOfType, PropertyType } from "../types/Elements";


/**
 * Interface that all gltf extensions must implement to be loaded by the gltf loader.
 * An ExtensionInstance is created by an ExtensionFactory, by calling createInstance().
 */
export interface IExtensionInstance {
  
  /**
   * Name of the extension
   */
  readonly name : string

  /**
   * Priority order of the extension, used to sort extensions, higher priority first.
   */
  readonly priority : number

  /**
   * Function called when an element is loaded/created, for extensions that need to create the element themselves.
   * @param data Data of the element to load, coming from the gltf file.
   */
  loadElement<P extends Gltf2.Property>( data : P ) : null | Promise<ElementOfType<PropertyType<P>>>

  /**
   * Function called after an element has been loaded/created, for extensions that need to modify the element after loading.
   * @param data Data of the loaded element, coming from the gltf file.
   * @param element The element that has been loaded.
   */
  acceptElement<P extends Gltf2.Property>( data : P, element : ElementOfType<PropertyType<P>> ) : Promise<ElementOfType<PropertyType<P>>>
}



/**
 * The implementation of an extension factory.
 * Passing by factories instead of direct instances allow to pass additional parameters to the extension and keep the extension instance simple.
 */
export interface IExtensionFactory {

  /**
   * Name of the extension
   */
  readonly name : string

  /**
   * Create an instance of the extension.
   * @param gltfLoader GLTF loader to use
   */
  createInstance( gltfLoader : GltfLoader ) : IExtensionInstance

}
