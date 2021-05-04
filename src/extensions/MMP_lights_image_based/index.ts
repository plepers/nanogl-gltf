import {quat} from "gl-matrix";
import Ibl from "nanogl-pbr/lighting/Ibl";
import Texture2D from "nanogl/texture-2d";
import {GLContext} from "nanogl/types";
import Gltf from "../..";
import Scene from "../../elements/Scene";
import GltfLoader from "../../io/GltfLoader";
import {AnyElement, ElementOfType, PropertyType} from "../../types/Elements";
import Gltf2 from "../../types/Gltf2";
import GltfTypes from "../../types/GltfTypes";
import {IExtensionFactory, IExtensionInstance} from "../IExtension";

const EXT_ID: string = 'MMP_lights_image_based';


// ======
// MODELS
// ======
interface IMMP_LIB_Light {

  name?: string;
  rotation?: quat;
  intensity?: number;
  irradianceCoefficients: Array<Array<number>>;
  specularImage: number;
  specularImageSize: number;

}

interface IMMP_LIB_Extension {
  lights: IMMP_LIB_Light[];
}

interface IMMP_LIB_LightInstance {
  light: number;
  extras?: any;
  extensions?: {
    [key: string]: any;
  };
}

interface LightItemCollection {
  name: string;
  index: number;
}


interface IMMPIBLSource {
  size: number;
  surface: TexImageSource;
}


class IBLCollection {

  list: MMPIBLElement[];

  _items: Array<LightItemCollection>;

  constructor() {
    this.list = [];
    this._items = [];
  }

  addLight( light: MMPIBLElement, name: string = undefined ) {

    this.list.push( light );
    this._items.push( {name: name, index: this.list.length - 1} )

  }

  getLightByName( name: string ): MMPIBLElement {
    let out: MMPIBLElement;
    for( let i = 0;i < this._items.length;i++ ) {
      if( this._items[i].name == name ) {
        out = this.list[this._items[i].index];
        break;
      }
    }
    return out;
  }

  getLightsByName( name: string ): Array<MMPIBLElement> {
    let out: Array<MMPIBLElement> = []
    for( let i = 0;i < this._items.length;i++ ) {
      if( this._items[i].name == name ) {
        out.push( this.list[this._items[i].index] );
      }
    }
    return out;
  }

}


export class MMPIBLElement {

  source: IMMPIBLSource;
  intensity: number;
  sh: ArrayLike<number>;
  env: Texture2D;
  ibl: Ibl;

}


class MMPIBLScene extends Scene {

  iblDef: MMPIBLElement;

  setIblDef( def ) {
    this.iblDef = def;
  }

  async allocateGl( gl: GLContext ): Promise<any> {

    const texStd = new Texture2D( gl, gl.RGBA );
    texStd.fromImage( this.iblDef.source.surface );
    this.iblDef.ibl = new Ibl( texStd, this.iblDef.sh );
    this.iblDef.ibl.shMode = "SH9";

  }

}



// ======
// LOADER
// ======
class MMPIBLLoader {

  static async load( loader: GltfLoader, lightData: IMMP_LIB_Light ): Promise<MMPIBLElement> {

    const iblSource: IMMPIBLSource = {
      size: lightData.specularImageSize,
      surface: null
    }

    const img = await loader.getElement( GltfTypes.IMAGE, lightData.specularImage );
    iblSource.surface = img.texImageSource;

    const def = new MMPIBLElement();
    def.source = iblSource;
    const coeffs = lightData.irradianceCoefficients;

    let sh = new Float32Array( 9 * 3 );

    let idx = 0;
    for( let i = 0;i < coeffs.length;i++ ) {
      for( let j = 0;j < coeffs[i].length;j++ ) {
        sh[idx] = coeffs[i][j];
        idx += 1;
      }
    }

    def.sh = sh;
    def.intensity = lightData.intensity !== undefined ? lightData.intensity : 1.0;

    return def;

  }

}


// =========
// EXTENSION
// =========
class Instance implements IExtensionInstance {

  readonly name: string = EXT_ID;
  readonly priority: number = 1;

  loader: GltfLoader;
  lights: IBLCollection;

  readonly disabled: boolean = false;

  constructor( gltfLoader: GltfLoader ) {

    this.loader = gltfLoader;

    const capa = this.loader.gltfIO.capabilities;
    const extReg = Gltf.getExtensionsRegistry();
    const hasExtLib =
      extReg._extensionFactories["EXT_lights_image_based"] !== undefined ||
      extReg._additionalExtensions.find( ( v ) => v.name === "EXT_lights_image_based" ) !== undefined

    this.disabled = capa && capa.isWebgl2 && hasExtLib;

    if( this.disabled )
      return;

    this.lights = new IBLCollection();
    gltfLoader.gltf.extras.lightsImageBased = this.lights;

  }

  loadElement<P extends Gltf2.Property>( data: P ): Promise<ElementOfType<PropertyType<P>>>;
  loadElement( data: Gltf2.Property ): Promise<AnyElement> {
    if( this.disabled )
      return null;
    if( data.gltftype === GltfTypes.SCENE && data.extensions && data.extensions[EXT_ID] ) {
      const scene = new MMPIBLScene();
      return scene.parse( this.loader, data ).then( () => scene );
    }
    return null;
  }


  _getLightData( index: number ): IMMP_LIB_Light {
    if( this.disabled )
      return null;
    const lightDatas: IMMP_LIB_Extension = this.loader._data.extensions?.[EXT_ID];
    if( lightDatas === undefined ) throw new Error( EXT_ID + ' no extension data' );
    return lightDatas.lights[index];
  }


  async _createLight( iData: IMMP_LIB_LightInstance ) {
    if( this.disabled )
      return null;
    const lightData: IMMP_LIB_Light = this._getLightData( iData.light );

    var iblElement = await MMPIBLLoader.load( this.loader, lightData );
    this.lights.addLight( iblElement, lightData.name ? lightData.name : "ibl-" + this.lights.list.length );

    return iblElement;
  }


  acceptElement<P extends Gltf2.Property>( data: P, element: ElementOfType<PropertyType<P>> ): null | Promise<ElementOfType<PropertyType<P>>>;
  async acceptElement( data: Gltf2.Property, element: Scene | MMPIBLScene ): null | Promise<Scene> {

    if( this.disabled || data.gltftype !== GltfTypes.SCENE )
      return element;

    if( data.extensions && data.extensions[EXT_ID] ) {
      ( element as MMPIBLScene ).setIblDef( await this._createLight( data.extensions[EXT_ID] ) );
    }

    return element;

  }

}


export default class MMP_lights_image_based implements IExtensionFactory {
  readonly name: string = EXT_ID;
  createInstance( gltfLoader: GltfLoader ): IExtensionInstance {
    return new Instance( gltfLoader );
  }
}