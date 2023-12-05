

import { vec3 } from 'gl-matrix';
import PbrMetallicRoughness from './PbrMetallicRoughness';
import NormalTextureInfo from './NormalTextureInfo';
import OcclusionTextureInfo from './OcclusionTextureInfo';
import TextureInfo from './TextureInfo';

import { GLContext, isWebgl2 } from 'nanogl/types';
import MaterialPass from 'nanogl-pbr/MaterialPass';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import Input from 'nanogl-pbr/Input';
import {default as BaseMaterial}  from 'nanogl-pbr/Material';
import Primitive from './Primitive';
import Node from './Node';
import { IElement } from '../types/Elements';
import Gltf from '../Gltf';
import Flag from 'nanogl-pbr/Flag';
import { isAllZeros } from '../lib/Utils';
import UnlitPass from 'nanogl-pbr/UnlitPass';
import ShaderVersion from 'nanogl-pbr/ShaderVersion';
import { StandardMetalness, StandardPass } from 'nanogl-pbr/StandardPass';
import { MetalnessSurface } from 'nanogl-pbr/PbrSurface';





const SRC_ALPHA             = 0x0302;
const ONE_MINUS_SRC_ALPHA   = 0x0303;


/**
 * Interface for PbrMaterials that needs a method to setup a nanogl-pbr StandardPass
 */
export interface IPbrInputsData {
  setupPass( pass : StandardPass ):void
}


/**
 * Base interface for Material classes, adding a method to base Element interface to create a nanogl-pbr Material object.
 */
export interface IMaterial extends IElement {
  readonly gltftype: GltfTypes.MATERIAL
  createMaterialForPrimitive( gltf:Gltf, node : Node, primitive : Primitive ) : BaseMaterial
}


/**
 * A simple nanogl-pbr MaterialPass but with a shader version attribute
 */
export type GltfMaterialPass = MaterialPass & {
  version : ShaderVersion
}


/**
 * The GltfBaseMaterial element contains the base properties and methods for all Material classes coming from a glTF file
 */
export abstract class GltfBaseMaterial<TPass extends GltfMaterialPass> implements IMaterial {

  readonly gltftype = GltfTypes.MATERIAL;
  name        : undefined | string;
  extras      : any   ;

  /**
   * PbrMetallicRoughness element, containing the base color, metallic, roughness and metallicRoughnessTexture properties.
   */
  pbrMetallicRoughness?: PbrMetallicRoughness;

  /**
   * Normal texture
   */
  normalTexture?: NormalTextureInfo;

  /**
   * Occlusion texture
   */
  occlusionTexture?: OcclusionTextureInfo;

  /**
   * Emissive texture
   */
  emissiveTexture?: TextureInfo;

  /**
   * Emissive factor, defining the strength applied on emissiveTexture. Default to [0,0,0]
   */
  emissiveFactor: vec3;

  /**
   * Alpha rendering mode (OPAQUE, MASK or BLEND). Default to OPAQUE
   */
  alphaMode: Gltf2.MaterialAlphaMode;

  /**
   * Alpha cutoff value used when alphaMode is MASK. Default to 0.5
   */
  alphaCutoff: number;

  /**
   * Whether the material will be rendered on double sides. Default to false
   */
  doubleSided: boolean;

  /**
   * Copy of pbrMetallicRoughness, used to setup the StandardPass
   */
  pbrInputsData : IPbrInputsData;


  /**
   * Pass used to render the material, created in setupMaterials()
   */
  protected _materialPass   : TPass

  get materialPass() : TPass {
    return this._materialPass;
  }


  /**
   * Create a nanogl-pbr Material object for a given Primitive, using the Pass created in setupMaterials().
   * @param gltf GLTF where the Primitive comes from
   * @param node Parent Node of the Primitive, unused here
   * @param primitive Primitive to create the Material for
   */
  createMaterialForPrimitive( gltf:Gltf, node : Node, primitive : Primitive ) : BaseMaterial {
    const gl = gltf.gl
    this._materialPass.version.set( isWebgl2(gl) ? '300 es' : '100' )

    const material = new BaseMaterial( gl, this._materialPass.name )
    material.addPass( this._materialPass, 'color' )

    const normal = primitive.attributes.getSemantic( 'NORMAL')
    const tangent = primitive.attributes.getSemantic( 'TANGENT')
    material.inputs.add( new Flag('hasNormals', normal !== null ))
    material.inputs.add( new Flag('hasTangents', tangent !== null ))

    
    const vcColorAttrib = primitive.attributes.getSemantic( 'COLOR_0')
    if( vcColorAttrib !== null ){
      // vertex color
      const vcInput = new Input( 'vertexColor', 3 );
      vcInput.attachAttribute( vcColorAttrib.glslname );
      material.inputs.add( vcInput );
    }

    material.addPass( gltf.depthPass, 'depth' );
    
    return material;
  }

  

  /**
   * Parse the Material data, fill the emissiveFactor, alphaMode, alphaCutoff and doubleSided properties,
   * create the PbrMetallicRoughness, NormalTexture, OcclusionTexture and EmissiveTexture elements if needed,
   * and call the setupMaterials() method.
   * 
   * Is async as it may need to wait for PbrMetallicRoughness, NormalTexture, OcclusionTexture and EmissiveTexture elements to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse(gltfLoader: GltfLoader, data: Gltf2.IMaterial): Promise<any> {

    this.emissiveFactor = new Float32Array(data.emissiveFactor || [0, 0, 0]) as vec3;

    this.alphaMode = data.alphaMode || Gltf2.MaterialAlphaMode.OPAQUE;
    this.alphaCutoff = data.alphaCutoff ?? 0.5;
    this.doubleSided = data.doubleSided ?? false;

    await this.parsePbrInputsData( gltfLoader, data );

    if (data.normalTexture !== undefined) {
      this.normalTexture = await gltfLoader._loadElement(data.normalTexture);
    }

    if (data.occlusionTexture !== undefined) {
      this.occlusionTexture = await gltfLoader._loadElement(data.occlusionTexture);
    }

    if (data.emissiveTexture !== undefined) {
      this.emissiveTexture = await gltfLoader._loadElement(data.emissiveTexture);
    }

    this.name = data.name;
    this.setupMaterials();

  }

  /**
   * Parse the PbrMetallicRoughness data, filling the pbrMetallicRoughness property with a new PbrMetallicRoughness element.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parsePbrInputsData( gltfLoader: GltfLoader, data: Gltf2.IMaterial ) : Promise<any>{
    if (data.pbrMetallicRoughness !== undefined) {
      this.pbrInputsData = this.pbrMetallicRoughness = new PbrMetallicRoughness()
      await this.pbrMetallicRoughness.parse(gltfLoader, data.pbrMetallicRoughness)
    }
  }

  /**
   * Configure PBR Surface for a given Pass with this Material's options.
   * If this.pbrInputsData is defined, call its setupPass() method, otherwise set a MetalnessSurface.
   * @param pass Pass to configure
   */
  configurePbrSurface( pass : StandardPass ){
    if (this.pbrInputsData !== undefined) {
      this.pbrInputsData.setupPass( pass );
    } else {
      pass.setSurface( new MetalnessSurface() )
    }
  }

  /**
   * Configure alpha rendering mode for a given Pass with this Material's options
   * (depth mask, blend, blendFunc, mask, alphaMode and alphaCutoff uniform)
   * @param pass Pass to configure
   */
  configureAlpha( pass : StandardPass|UnlitPass ){
    if( this.alphaMode === Gltf2.MaterialAlphaMode.BLEND ){

      pass.glconfig.depthMask( false );
      pass.glconfig.enableBlend()
      pass.glconfig.blendFunc( SRC_ALPHA, ONE_MINUS_SRC_ALPHA );
      pass.mask = Gltf.getRenderConfig().blendedMask;
    } else {
      pass.mask = Gltf.getRenderConfig().opaqueMask;
    }

    pass.alphaMode.set( this.alphaMode );
    if( this.alphaMode === Gltf2.MaterialAlphaMode.MASK ){
      pass.alphaCutoff.attachUniform('uAlphaCutoff').set( this.alphaCutoff );
    }
  }

  /**
   * Abstract class to setup the nanogl-pbr MaterialPass (enable depth test, cullface, alphaMode, attach textures samplers and factors, ...)
   */
  abstract setupMaterials(): void;

}


/**
 * Basic PBR implementation of GltfBaseMaterial using a nanogl-pbr StandardPass
 */
export default class Material extends GltfBaseMaterial<StandardPass> {

  /**
   * Creates a StandardPass and attach emissive, normal and occlusion textures with samplers and their strength factors.
   * Also configure alpha rendering mode and PBR surface.
   */
  setupMaterials(): void {
    const pass = new StandardPass(this.name);

    pass.glconfig.enableDepthTest();
    pass.glconfig.enableCullface(!this.doubleSided);
    pass.doubleSided.set( this.doubleSided );

    this.configureAlpha( pass );
    this.configurePbrSurface( pass );


    if ( this.emissiveTexture ) {
      const sampler = this.emissiveTexture.createSampler('emissive');
      pass.emissive.attach( sampler );
    }
    
    if( !isAllZeros( this.emissiveFactor) ){
      pass.emissiveFactor.attachUniform('uEmissFactor').set(...this.emissiveFactor);
    }
    
    
    const nrm = this.normalTexture;
    if ( nrm ) {
      const sampler = nrm.createSampler( 'nrmmap' );
      pass.normal.attach( sampler )
      
      if (nrm.scale !== 1) {
        pass.normalScale.attachUniform('uNormalScale').set(nrm.scale)
      }
    }
    

    const occlu = this.occlusionTexture;
    if (occlu) {

      const sampler = occlu.createSampler( 'occlu' )
      pass.occlusion.attach(sampler);

      if (occlu.strength !== 1) {
        pass.occlusionStrength.attachUniform('uOccluStrength').set(occlu.strength)
      }
    }

    this._materialPass = pass;

  }

}
