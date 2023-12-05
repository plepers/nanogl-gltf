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


/**
 * Context object passed to material and pass override factories, if needed when overriding a material or pass
 */
export type MaterialOverrideFactoryContext = {

  /**
   * The gltf material data to override
   */
  data: Gltf2.IMaterial

  /**
   * The gltf object containing the material
   */
  gltf:Gltf

  /**
   * The node containing the primitive
   */
  node: Node

  /**
   * The primitive which will use the material
   */
  primitive: Primitive

}

/**
 * Simple material or material override factory function returning a Material
 */
export type MaterialOverrideFactory = Material | (( ctx: MaterialOverrideFactoryContext )=>Material);

/**
 * Simple pass or pass override factory function returning a MaterialPass
 */
export type PassOverrideFactory = MaterialPass | (( ctx: MaterialOverrideFactoryContext, material: Material )=>MaterialPass|null);



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



/**
 * This extension allows all materials and their passes to be overriden by custom code at load time.
 * Useful to add custom shading, completely replace a material, add Chunk effect to every materials of a GLTF, ...
 */
export default class MaterialOverrideExtension implements IExtensionFactory {
  
  readonly name: string = 'material_override';
  
  /**
   * Map of material override factories
   */
  readonly materials: Map<string, MaterialOverrideFactory> = new Map();

  /**
   * Map of pass override factories
   */
  readonly passes: Map<string, PassOverrideFactory> = new Map();

  /**
   * Add Material Override.
   * Gltf material with the given name will be replaced by the one created by the given material factory
   * @param name The name of the gltf material to override, if empty string the given material will be used as default override
   * @param m Material factory to use to create the override material
   */
  overrideMaterial( name:string | "", m: MaterialOverrideFactory ): void {
    this.assertNotExist( name )
    this.materials.set( name, m )
  }
  
  /**
   * Add Pass Override.
   * The Color pass of the overriden material will be replaced by the one created by the given pass factory
   * @param name The name of the material to override, if empty string is given, the pass will be applied to all materials
   * @param p Pass factory to use to create the override pass
   */
  overridePass( name:string | "", p: PassOverrideFactory ): void {
    this.assertNotExist(name)
    this.passes.set( name, p )
  }
  
  /**
   * Check that the given name is not already used by a material or pass override
   * @param name Material or pass name to check
   */
  private assertNotExist(name:string){
    if( this.materials.has( name )) throw `material override for "${name}" already exist`
    if( this.passes.has( name )) throw `pass override for "${name}" already exist`
  }

  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new MaterialOverrideExtensionInstance(gltfLoader, this);
  }

}