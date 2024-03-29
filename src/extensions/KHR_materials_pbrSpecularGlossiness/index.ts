import { IExtensionFactory, IExtensionInstance } from "../IExtension";
import GltfLoader from "../../io/GltfLoader";
import Gltf2 from "../../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../../types/Elements";
import GltfTypes from "../../types/GltfTypes";
import Material from "./PbrSpecularGlossinessMaterial";


const EXT_ID  = 'KHR_materials_pbrSpecularGlossiness';


class Instance implements IExtensionInstance {


  readonly name: string = EXT_ID;
  readonly priority: number = 1;
  
  loader: GltfLoader;


  constructor( gltfLoader : GltfLoader) {
    this.loader = gltfLoader;
  }

  
  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;

  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    if( data.gltftype === GltfTypes.MATERIAL && data.extensions && data.extensions[EXT_ID] ){
      const material = new Material();
      return material.parse( this.loader, data ).then(()=>material);
    }
    return null;
  }
  
  
  acceptElement<P extends Gltf2.Property>(data: P, element: ElementOfType<PropertyType<P>> ) : null | Promise<ElementOfType<PropertyType<P>>> {
    return null;
  }
  

}


/**
 * In PBR materials, two workflows exist for specifying the surface appearance of a material:
 * - Metallic-Roughness workflow, defined natively in nanogl-gltf with PbrMetallicRoughness element,
 * - Specular-Glossiness workflow, defined with this extension.
 * 
 * This extension allows Materials to be defined using the specular-glossiness workflow, with diffuseTexture as the base color,
 * and specularGlossinessTexture containing the specular and glossiness data.
 */
export default class KHR_materials_pbrSpecularGlossiness implements IExtensionFactory {
  readonly name: string = EXT_ID;
  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new Instance(gltfLoader);
  }
}