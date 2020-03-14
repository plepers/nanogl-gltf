import { IExtensionFactory, IExtensionInstance } from "./IExtension";
import GltfLoader from "../io/GltfLoader";
import Gltf2 from "../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../types/Elements";
import GltfTypes from "../types/GltfTypes";
import MaterialPass from "nanogl-pbr/MaterialPass";
import Material from "../elements/Material";



class OverrideMaterial extends Material {

  setPass( p : MaterialPass ){
    this._materialPass = p;
  }
  setupMaterialPass(): void {}
}



class MaterialOverride implements IExtensionInstance {


  readonly name: string = 'material_override';
  readonly priority: number = 10;
  
  loader: GltfLoader;
  private passes: Record<string, MaterialPass>;


  constructor( gltfLoader : GltfLoader, passes: Record<string, MaterialPass>) {
    this.loader = gltfLoader;
    this.passes = passes;
  }

  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;

  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    switch (data.gltftype) {
      case GltfTypes.MATERIAL: return this.createMaterial(data);
      default: return null;
    }
  }


  createMaterial(data: Gltf2.IMaterial): Promise<Material> {
    const pass = this.passes[data.name];
    if( pass !== undefined ){
      const el = new OverrideMaterial();
      el.parse( this.loader, data);
      el.setPass( pass );
      return Promise.resolve(el);
    }
    return null;
  }


}


export default class MaterialOverrideExtension implements IExtensionFactory {

  readonly name: string = 'material_override';

  overrides: Record<string, MaterialPass>;

  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    if( this.overrides === undefined ){
      throw new Error("MaterialOverrideExtension overrides not set");
    }
    return new MaterialOverride(gltfLoader, this.overrides);
  }


}