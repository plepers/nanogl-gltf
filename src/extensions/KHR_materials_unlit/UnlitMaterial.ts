import Material, { GltfBaseMaterial } from "../../elements/Material"
import UnlitPass from 'nanogl-pbr/UnlitPass'
import { isAllOnes } from "../../lib/Utils";
import PbrMetallicRoughness from "../../elements/PbrMetallicRoughness";
import { Uniform } from "nanogl-pbr/Input";


/**
 * Simple material using nanogl-pbr UnlitPass.
 * An Unlit shading is a shading that does not use lighting, metallic, roughness, ... but only a baseColor.
 */
export default class UnlitMaterial extends GltfBaseMaterial<UnlitPass> {

  /**
   * Creates a nanogl-pbr UnlitPass and attach basecolor texture with sampler and its strength factor, if defined.
   * Also configure alpha rendering mode.
   */
  setupMaterials(): void {
    const pass = new UnlitPass(this.name);

    pass.glconfig.enableDepthTest();
    pass.glconfig.enableCullface(!this.doubleSided);
    pass.doubleSided.set( this.doubleSided );


    this.configureAlpha(pass);
    
    if (this.pbrInputsData !== undefined) {
      const metalicRoughness : PbrMetallicRoughness = this.pbrInputsData as PbrMetallicRoughness;

      if( metalicRoughness.baseColorTexture )
      if( metalicRoughness.baseColorTexture ) {
        const baseColorSampler = metalicRoughness.baseColorTexture.createSampler('basecolor')
        pass.baseColor.attach(baseColorSampler, 'rgb')
        pass.alpha    .attach(baseColorSampler, 'a')
      }

      if( !isAllOnes( metalicRoughness.baseColorFactor ) ){
        const cFactor = new Uniform( 'uBasecolorFactor', 4 );
        cFactor.set( ...metalicRoughness.baseColorFactor )
        pass.baseColorFactor.attach(cFactor, 'rgb' )
        pass.alphaFactor    .attach(cFactor, 'a')
      }

    }

    this._materialPass = pass;

  }
}
