import { IExtensionFactory, IExtensionInstance } from "./IExtension";
import GltfLoader from "../io/GltfLoader";
import Gltf2 from "../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../types/Elements";
import GltfTypes from "../types/GltfTypes";
import MaterialPass from "nanogl-pbr/MaterialPass";
import Material from "../elements/Material";
import BaseMaterial from "nanogl-pbr/BaseMaterial";



class OverrideMaterial extends Material {

  _material: BaseMaterial;

  setMaterial( m : BaseMaterial ){
    this._material = m;
  }
  
  setupMaterialPass(): void {}
}



class MaterialOverride implements IExtensionInstance {


  readonly name: string = 'material_override';
  readonly priority: number = 10;
  
  loader: GltfLoader;
  private materials: Record<string, BaseMaterial>;


  constructor( gltfLoader : GltfLoader, materials: Record<string, BaseMaterial>) {
    this.loader = gltfLoader;
    this.materials = materials;
  }

  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;

  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    switch (data.gltftype) {
      case GltfTypes.MATERIAL: return this.createMaterial(data);
      default: return null;
    }
  }


  createMaterial(data: Gltf2.IMaterial): Promise<Material> {
    const material = this.materials[data.name];
    if( material !== undefined ){
      const el = new OverrideMaterial();
      el.parse( this.loader, data);
      el.setMaterial( material );
      return Promise.resolve(el);
    }
    return null;
  }


}


export default class MaterialOverrideExtension implements IExtensionFactory {

  readonly name: string = 'material_override';

  overrides: Record<string, BaseMaterial>;

  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    if( this.overrides === undefined ){
      throw new Error("MaterialOverrideExtension overrides not set");
    }
    return new MaterialOverride(gltfLoader, this.overrides);
  }


}