

import { vec3 } from 'gl-matrix';
import PbrMetallicRoughness from './PbrMetallicRoughness';
import NormalTextureInfo from './NormalTextureInfo';
import OcclusionTextureInfo from './OcclusionTextureInfo';
import TextureInfo from './TextureInfo';

import { GLContext } from 'nanogl/types';
import MaterialPass from 'nanogl-pbr/MaterialPass';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import StandardPass from '../glsl/StandardPass';
import Input, { Sampler } from 'nanogl-pbr/Input';
import BaseMaterial from 'nanogl-pbr/BaseMaterial';
import Primitive from './Primitive';
import Node from './Node';
import { IElement } from '../types/Elements';
import Gltf from '..';
import Texture from './Texture';


function _isAllOnes( a : ArrayLike<number> ) : boolean {
  for (let i = 0; i < a.length; i++) {
    if( a[i] !== 1 ) return false;
  }
  return true;
}

function _isAllZeros( a : ArrayLike<number> ) : boolean {
  for (let i = 0; i < a.length; i++) {
    if( a[i] !== 0 ) return false;
  }
  return true;
}


const SRC_ALPHA             = 0x0302;
const ONE_MINUS_SRC_ALPHA   = 0x0303;



export interface IMaterial extends IElement {

  readonly gltftype: GltfTypes.MATERIAL;
  
  name : string|undefined;
  
  createMaterialForPrimitive( gl : GLContext, node : Node, primitive : Primitive ) : BaseMaterial;
}



export default class Material implements IMaterial {

  readonly gltftype = GltfTypes.MATERIAL;
  
  name        : undefined | string;
  extras      : any   ;

  pbrMetallicRoughness?: PbrMetallicRoughness;
  normalTexture?: NormalTextureInfo;
  occlusionTexture?: OcclusionTextureInfo;
  emissiveTexture?: TextureInfo;
  emissiveFactor: vec3;
  alphaMode: Gltf2.MaterialAlphaMode;
  alphaCutoff: number;
  doubleSided: boolean;



  
  protected _materialPass   : MaterialPass

  get materialPass() : MaterialPass {
    return this._materialPass;
  }

  createMaterialForPrimitive( gl : GLContext, node : Node, primitive : Primitive ) : BaseMaterial {

    const material = new BaseMaterial( gl, this._materialPass.name );
    material.addPass( this._materialPass, 'color' )

    const vcColorAttrib = primitive.attributes.getSemantic( 'COLOR_0')
    if( vcColorAttrib !== null ){
      // vertex color
      const vcInput = new Input( 'vertexColor', 3 );
      vcInput.attachAttribute( vcColorAttrib.glslname );
      material.inputs.add( vcInput );
    }

    return material;
  }

  


  async parse(gltfLoader: GltfLoader, data: Gltf2.IMaterial): Promise<any> {

    this.emissiveFactor = <vec3>new Float32Array(data.emissiveFactor || [0, 0, 0]);

    this.alphaMode = data.alphaMode || Gltf2.MaterialAlphaMode.OPAQUE;
    this.alphaCutoff = data.alphaCutoff ?? 0.5;
    this.doubleSided = data.doubleSided ?? false;

    if (data.pbrMetallicRoughness !== undefined) {
      this.pbrMetallicRoughness = new PbrMetallicRoughness()
      await this.pbrMetallicRoughness.parse(gltfLoader, data.pbrMetallicRoughness)
    }

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


  assignSamplerTexture( sampler : Sampler, texture : Texture ){
    texture.glTexturePromise.then((tex)=>{
      sampler.set( tex );
    })
  }

// TODO: don't really need to be in gl allocation step
  setupMaterials(): void {
    const pass = new StandardPass(this.name);

    pass.glconfig.enableDepthTest();
    pass.glconfig.enableCullface(!this.doubleSided);
    pass.doubleSided.set( this.doubleSided );


    if( this.alphaMode === Gltf2.MaterialAlphaMode.BLEND ){
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

    const pbr = this.pbrMetallicRoughness;

    if (pbr !== undefined) {

      if (pbr.baseColorTexture) {
        const tc = pbr.baseColorTexture.createMaterialTexCoords(pass.texCoords);
        const baseColorSampler = new Sampler('tBaseColor', tc );
        this.assignSamplerTexture( baseColorSampler, pbr.baseColorTexture.texture )
        pass.baseColor.attach(baseColorSampler, 'rgb')
        pass.alpha.attach(baseColorSampler, 'a')
      }

      if (pbr.metallicRoughnessTexture) {
        const tc = pbr.metallicRoughnessTexture.createMaterialTexCoords(pass.texCoords);
        const mrSampler = new Sampler('tMetalicRoughness', tc );
        this.assignSamplerTexture( mrSampler, pbr.metallicRoughnessTexture.texture )
        pass.metalness.attach(mrSampler, 'b')
        pass.roughness.attach(mrSampler, 'g')
      }

      if( ! _isAllOnes( pbr.baseColorFactor ) ){
        pass.baseColorFactor.attachUniform('uBasecolorFactor').set(...pbr.baseColorFactor)
      }

      if (pbr.metallicFactor !== 1) {
        pass.metalnessFactor.attachUniform('uMetalnessFactor').set(pbr.metallicFactor)
      }
      
      if (pbr.roughnessFactor !== 1) {
        pass.roughnessFactor.attachUniform('uRoughnessFactor').set(pbr.roughnessFactor)
      }
      
      
    }
    

    if ( this.emissiveTexture ) {
      const tc = this.emissiveTexture.createMaterialTexCoords(pass.texCoords);
      const sampler = pass.emissive.attachSampler('tEmissive', tc);
      this.assignSamplerTexture( sampler, this.emissiveTexture.texture )
    }
    
    if( !_isAllZeros( this.emissiveFactor) ){
      pass.emissiveFactor.attachUniform('uEmissFactor').set(...this.emissiveFactor);
    }
    
    
    const nrm = this.normalTexture;
    if ( nrm ) {
      const tc = nrm.createMaterialTexCoords(pass.texCoords);
      const sampler = pass.normal.attachSampler('tNormal', tc);
      this.assignSamplerTexture( sampler, nrm.texture )
      
      if (nrm.scale !== 1) {
        pass.normalScale.attachUniform('uNormalScale').set(nrm.scale)
      }
    }
    

    const occlu = this.occlusionTexture;
    if (occlu) {

      const tc = occlu.createMaterialTexCoords(pass.texCoords);
      const sampler = pass.occlusion.attachSampler('tOcclusion', tc);
      this.assignSamplerTexture( sampler, occlu.texture )

      if (occlu.strength !== 1) {
        pass.occlusionStrength.attachUniform('uOccluStrength').set(occlu.strength)
      }
    }

    this._materialPass = pass;

  }

}


