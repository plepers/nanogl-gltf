import { IExtensionInstance, IExtensionFactory } from "../IExtension";
import GltfLoader from "../../io/GltfLoader";
import Gltf2 from "../../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../../types/Elements";
import GltfTypes from "../../types/GltfTypes";
import UnlitMaterial from "./UnlitMaterial";


const EXT_ID  = 'KHR_materials_unlit';


class Instance implements IExtensionInstance {


  readonly name: string = EXT_ID;
  readonly priority: number = 1;
  
  loader: GltfLoader;


  constructor( gltfLoader : GltfLoader) {
    this.loader = gltfLoader;
  }


  
  acceptElement<P extends Gltf2.Property>(data: P, element: ElementOfType<PropertyType<P>> ) : null | Promise<ElementOfType<PropertyType<P>>> {
    return null;
  }
  
  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;
  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    if( data.gltftype === GltfTypes.MATERIAL && data.extensions && data.extensions[EXT_ID] ){
      const unlitMaterial = new UnlitMaterial();
      return unlitMaterial.parse( this.loader, data )
        .then( ()=>unlitMaterial );
    }
    return null;
  }



}


/**
 * This extension defines an unlint shading model for use in glTF 2.0 materials, as an alternative to PBR shading.
 * The Unlit material is a constantly shaded surface that is independent of lighting.
 * It could be useful for performance issues or for a cartoonish look.
 */
export default class KHR_materials_unlit implements IExtensionFactory {
  readonly name: string = EXT_ID;
  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new Instance(gltfLoader);
  }
}