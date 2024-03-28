import Material from "../../elements/Material";
import PbrSpecularGlossiness from "./PbrSpecularGlossiness";
import GltfLoader from "../../io/GltfLoader";
import Gltf2 from "../../types/Gltf2";


/**
 * PBR implementation of GltfBaseMaterial using a nanogl-pbr StandardPass and a specular-glossiness workflow
 */
export default class PbrSpecularGlossinessMaterial extends Material {
  
  /**
   * PbrSpecularGlossiness element, containing the diffuse color, specular and glossiness properties.
   */
  pbrSpecularGlossiness: PbrSpecularGlossiness;

  /**
   * Parse the PbrSpecularGlossiness data, filling the pbrSpecularGlossiness property with a new PbrSpecularGlossiness element.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parsePbrInputsData( gltfLoader: GltfLoader, data: Gltf2.IMaterial ) : Promise<any>{
    const pbrSpecGlossData = data.extensions['KHR_materials_pbrSpecularGlossiness']
    this.pbrInputsData = this.pbrSpecularGlossiness = new PbrSpecularGlossiness()
    await this.pbrSpecularGlossiness.parse(gltfLoader, pbrSpecGlossData );
  }

}