


import { vec4 } from 'gl-matrix';
import TextureInfo from './TextureInfo';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import { isAllOnes } from '../lib/Utils';
import { Uniform } from 'nanogl-pbr/Input';
import { StandardPass } from 'nanogl-pbr/StandardPass';
import { MetalnessSurface } from 'nanogl-pbr/PbrSurface';
import { ColorSpace } from 'nanogl-pbr/ColorSpace';


/**
 * The PbrMetallicRoughness element contains the base properties for a PBR material, using the metallic-roughness workflow.
 */
export default class PbrMetallicRoughness {

  /**
   * Factors applied to each color channel of the baseColorTexture. Default to [1, 1, 1, 1]
   */
  baseColorFactor          : vec4       ;

  /**
   * Factor for the metalness of the material. Default to 1
   */
  metallicFactor           : number     ;

  /**
   * Factor for the roughness of the material. Default to 1
   */
  roughnessFactor          : number     ;

  /**
   * Base color texture for the material
   */
  baseColorTexture?        : TextureInfo;

  /**
   * Metallic-roughness texture for the material. Metallic will be sampled from the B channel, roughness from the G channel.
   * If R or A channels are present, they will be ignored.
   */
  metallicRoughnessTexture?: TextureInfo;
  

  /**
   * Parse the PbrMetallicRoughness data, filling the class properties.
   * 
   * Is async as it may need to wait for baseColorTexture and metallicRoughnessTexture to be loaded.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse( gltfLoader:GltfLoader, data: Gltf2.IMaterialPbrMetallicRoughness ) : Promise<any>{

    this.baseColorFactor = <vec4> new Float32Array(data.baseColorFactor || [1,1,1,1]);
    
    this.metallicFactor  = data.metallicFactor ?? 1
    this.roughnessFactor = data.roughnessFactor ?? 1

    if( data.baseColorTexture !== undefined ){
      this.baseColorTexture = await gltfLoader._loadElement( data.baseColorTexture );
    }
    
    if( data.metallicRoughnessTexture !== undefined ){
      this.metallicRoughnessTexture = await gltfLoader._loadElement( data.metallicRoughnessTexture );
    }

  }

  /**
   * Setup the PbrMetallicRoughness data on a nanogl-pbr StandardPass by attaching baseColor
   * and metallicRoughness textures with samplers and their strength factors. It uses a nanogl-pbr MetalnessSurface.
   * @param pass Pass to setup
   */
  setupPass( pass : StandardPass ){

    const surface = new MetalnessSurface() 
    pass.setSurface( surface )

    if (this.baseColorTexture) {
      const baseColorSampler = this.baseColorTexture.createSampler( 'basecolor' )
      baseColorSampler.colorspace = ColorSpace.SRGB
      
      surface.baseColor.attach(baseColorSampler, 'rgb')
      pass.alpha       .attach(baseColorSampler, 'a')
    }

    if( ! isAllOnes( this.baseColorFactor ) ){
      const cFactor = new Uniform( 'uBasecolorFactor', 4 );
      cFactor.set( ...this.baseColorFactor )
      surface.baseColorFactor.attach(cFactor, 'rgb' )
      pass.alphaFactor    .attach(cFactor, 'a')
    }


    if (this.metallicRoughnessTexture) {
      const mrSampler = this.metallicRoughnessTexture.createSampler( 'metalRough' )
      mrSampler.colorspace = ColorSpace.LINEAR
      
      surface.metalness.attach(mrSampler, 'b')
      surface.roughness.attach(mrSampler, 'g')
    }


    if (this.metallicFactor !== 1) {
      surface.metalnessFactor.attachUniform('uMetalnessFactor').set(this.metallicFactor)
    }
    
    if (this.roughnessFactor !== 1) {
      surface.roughnessFactor.attachUniform('uRoughnessFactor').set(this.roughnessFactor)
    }
    
  }

}
