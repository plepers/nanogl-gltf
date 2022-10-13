import { IExtensionFactory, IExtensionInstance } from "./IExtension";
import GltfLoader from "../io/GltfLoader";
import Gltf2 from "../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../types/Elements";
import GltfTypes from "../types/GltfTypes";
import { IMaterial } from "../elements/Material";
import Material from "nanogl-pbr/Material";
import { GLContext } from "nanogl/types";
import Primitive from "../elements/Primitive";
import Node from "../elements/Node";
import Gltf from "../Gltf";
import MaterialPass from "nanogl-pbr/MaterialPass";


type MaterialOverrideFactoryContext = {
  data: Gltf2.IMaterial
  gltf:Gltf
  node: Node
  primitive: Primitive
}

type MaterialOverrideFactory = Material | (( ctx: MaterialOverrideFactoryContext )=>Material);
type PassOverrideFactory = MaterialPass | (( ctx: MaterialOverrideFactoryContext, material: Material )=>MaterialPass|null);



function invokeMaterialFactory( factory: MaterialOverrideFactory, ctx: MaterialOverrideFactoryContext ): Material {
  if ( factory instanceof Function ) {
    return factory( ctx );
  }
  return factory;
}

function invokePassFactory( factory: PassOverrideFactory, ctx: MaterialOverrideFactoryContext, material: Material ): MaterialPass|null {
  if ( factory instanceof Function ) {
    return factory( ctx, material );
  }
  return factory;
}




/**
 * IMaterial which directly return it's material in `createMaterialForPrimitive()` implementation
 * used to implement `MaterialOverrideExtension.overrideMaterial()`
 */
class OverrideMaterial implements IMaterial {

  readonly gltftype: GltfTypes.MATERIAL = GltfTypes.MATERIAL;
  name: string | undefined;
  extras: any;
  
  constructor( private materialFactory : MaterialOverrideFactory, private data : Gltf2.IMaterial ){}

  createMaterialForPrimitive(gltf:Gltf, node: Node, primitive: Primitive ): Material {
    return invokeMaterialFactory( this.materialFactory, {
      data: this.data,
      gltf,
      node,
      primitive
    } );  
  }

  parse(gltfLoader: GltfLoader, data: Gltf2.IProperty): Promise<any> {
    return null;
  }
  
}




class MaterialOverrideExtensionInstance implements IExtensionInstance {


  readonly name: string = 'material_override';
  readonly priority: number = 10;
  
  loader: GltfLoader;


  constructor( gltfLoader : GltfLoader, readonly ext:MaterialOverrideExtension ) {
    this.loader = gltfLoader;
  }


  
  acceptElement<P extends Gltf2.Property>(data: P, element: ElementOfType<PropertyType<P>> ) : null | Promise<ElementOfType<PropertyType<P>>>;
  acceptElement(data: Gltf2.Property, element: AnyElement ) : null | Promise<AnyElement> {
    if( data.gltftype === GltfTypes.MATERIAL ){
      return this.createOverridePassMaterial(data, element as IMaterial );
    }
    return null;
  }
  
  
  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;
  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    if( data.gltftype === GltfTypes.MATERIAL ) {
      return this.createOverrideMaterial(data);
    } 
    return null;
  }


  createOverrideMaterial(data: Gltf2.IMaterial): Promise<IMaterial> {
    const materialFactory = this.ext.materials.get( data.name ) || this.ext.materials.get( '' )
    if( materialFactory !== undefined ){
      const el = new OverrideMaterial( materialFactory, data );
      return Promise.resolve(el);
    }
    return null;
  }



  /**
   * overwrite `createMaterialForPrimitive()` method of original material so it will return the given pass
   */
  createOverridePassMaterial(data: Gltf2.IMaterial, material: IMaterial): Promise<IMaterial> {
    const passFactory = this.ext.passes.get( data.name ) || this.ext.passes.get( '' );
    if( passFactory !== undefined ){
      const baseFunc = material.createMaterialForPrimitive
      material.createMaterialForPrimitive = ( gltf: Gltf, node : Node, primitive : Primitive ) => {
        const m = baseFunc.apply( material, [gltf, node, primitive]);
        const pass = invokePassFactory( passFactory, {
          data,
          gltf,
          node,
          primitive
        }, m )
        if( pass ){
          m.addPass( pass );
        }
        return m;  
      }
    }
    return null;
  }




}

export default class MaterialOverrideExtension implements IExtensionFactory {
  
  
  readonly name: string = 'material_override';
  
  readonly materials: Map<string, MaterialOverrideFactory> = new Map();
  readonly passes: Map<string, PassOverrideFactory> = new Map();

  /**
   * Add Material Override
   * gltf material with the given name will be replaced by the one craete by th given factory
   * @param name the name of the gltf material to override, if empty string the given material will be used as default override
   * @param m 
   */
  overrideMaterial( name:string | "", m: MaterialOverrideFactory ): void {
    this.assertNotExist( name )
    this.materials.set( name, m )
  }
  
  /**
   * Add Pass Override
   * the Color pass of the overideen material will be replaced by the given pass
   * @param name the name of the material to override, if empty string is given, the pass will be applied to all materials
   * @param m 
   */
  overridePass( name:string | "", p: PassOverrideFactory ): void {
    this.assertNotExist(name)
    this.passes.set( name, p )
  }
  
  private assertNotExist(name:string){
    if( this.materials.has( name )) throw `material override for "${name}" already exist`
    if( this.passes.has( name )) throw `pass override for "${name}" already exist`
  }

  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new MaterialOverrideExtensionInstance(gltfLoader, this);
  }


}