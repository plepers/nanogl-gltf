import { IExtensionFactory, IExtensionInstance } from "../IExtension";
import GltfLoader from "../../io/GltfLoader";
import Gltf2 from "../../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../../types/Elements";
import GltfTypes from "../../types/GltfTypes";
import Material, { IMaterial } from "../../elements/Material";
import BaseMaterial from "nanogl-pbr/BaseMaterial";
import { GLContext } from "nanogl/types";
import Primitive from "../../elements/Primitive";
import Node from "../../elements/Node";



const EXT_ID : string = 'KHR_texture_transform';

class Instance implements IExtensionInstance {


  readonly name: string = EXT_ID;
  readonly priority: number = -1;
  
  loader: GltfLoader;


  constructor( gltfLoader : GltfLoader) {
    this.loader = gltfLoader;
  }


  acceptElement<P extends Gltf2.Property>(data: P, element: ElementOfType<PropertyType<P>> ) : null | Promise<ElementOfType<PropertyType<P>>> {
    
    if( data.gltftype === GltfTypes.MATERIAL ){
      if( element instanceof Material ){
        // element.materialPass.get
      }
    }
    return Promise.resolve(element);
  }
  
  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;
  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    return null;
  }



}


export default class KHR_texture_transform implements IExtensionFactory {
  readonly name: string = EXT_ID;
  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new Instance(gltfLoader);
  }
}