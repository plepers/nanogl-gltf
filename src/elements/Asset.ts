
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';


/**
 * The Asset element is the simpler, it only contains metadata about the glTF asset.
 */
export default class Asset implements IElement {

  readonly gltftype : GltfTypes.ASSET = GltfTypes.ASSET;
  name        : undefined | string;
  extras      : any   ;

  /**
   * glTF version targeted by this asset
   * 
   * Most of the time 1.0 or 2.0. Knowing that 1.0 could be problematic as it don't support PBR (Physically-Based Rendering), it is recommended to use 2.0.
   */
  version    : string;

  /**
   * A copyright message suitable for display to credit the content creator
   */
  copyright? : string;

  /**
   * Tool that generated this glTF model. Useful for debugging
   */
  generator? : string;

  /**
   * Minimum glTF version support needed to load this asset
   */
  minVersion?: string;


  /**
   * Parse the Asset data, only getting metadata from the glTF data and storing it in this object.
   * @param gltfLoader GLTFLoader to use, unused here
   * @param data Data to parse
   */
  parse( gltfLoader:GltfLoader, data: Gltf2.IAsset ) : Promise<any> {

    this.version    = data.version;
    this.copyright  = data.copyright;
    this.generator  = data.generator;
    this.minVersion = data.minVersion;

    return Promise.resolve();
  }

}
