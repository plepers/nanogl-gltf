import { quat } from "gl-matrix";
import { IExtensionInstance, IExtensionFactory } from "../IExtension";
import GltfLoader from "../../io/GltfLoader";
import Gltf2 from "../../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../../types/Elements";
import Scene from "../../elements/Scene";
import GltfTypes from "../../types/GltfTypes";
import TextureCube from "nanogl/texture-cube";
import { GLContext } from "nanogl/types";
import IblPmrem from "nanogl-pbr/lighting/IBLPmrem";
import Image from "../../elements/Image";

const EXT_ID: string = 'EXT_lights_image_based';

// ======
// MODELS
// ======
interface IEXT_LIB_Light {

  name?: string;
  rotation?: quat;
  intensity?: number;
  irradianceCoefficients: Array<Array<number>>;
  specularImages: Array<Array<number>>;
  specularImageSize: number;

}

interface IEXT_LIB_Extension {
  lights: IEXT_LIB_Light[];
}

interface IEXT_LIB_LightInstance {
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


interface IIBLSource {
  size: number;
  surfaces: Array<TexImageSource[]>;
}


class IBLCollection {

  list: IBLElement[];

  _items: Array<LightItemCollection>;

  constructor() {
    this.list = [];
    this._items = [];
  }

  addLight(light: IBLElement, name: string = undefined) {

    this.list.push(light);
    this._items.push({ name: name, index: this.list.length - 1 })

  }

  getLightByName(name: string): IBLElement {
    let out: IBLElement;
    for (let i = 0; i < this._items.length; i++) {
      if (this._items[i].name == name) {
        out = this.list[this._items[i].index];
        break;
      }
    }
    return out;
  }

  getLightsByName(name: string): Array<IBLElement> {
    let out: Array<IBLElement> = []
    for (let i = 0; i < this._items.length; i++) {
      if (this._items[i].name == name) {
        out.push(this.list[this._items[i].index]);
      }
    }
    return out;
  }

}


export class IBLElement {

  source: IIBLSource;
  intensity: number;
  sh: ArrayLike<number>;
  env: TextureCube;
  ibl: IblPmrem;

}


class IBLScene extends Scene {

  iblDef: IBLElement

  setIblDef(def) {
    this.iblDef = def;
  }

  async allocateGl(gl: GLContext): Promise<any> {

    const tex = new TextureCube(gl, gl.RGBA);

    tex.width = this.iblDef.source.size;
    tex.height = this.iblDef.source.size;
    tex.setFilter(true, true, false);

    tex.bind();

    const surf = this.iblDef.source.surfaces;

    let targetMipCount = Math.ceil(Math.log2(tex.width)) + 1;

    let surfcount = surf.length;
    let w = tex.width;
    for (let lvl = 0; lvl < surfcount; lvl++) {
      let imgs = surf[lvl];
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, lvl, tex.internal, tex.format, tex.type, imgs[0]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, lvl, tex.internal, tex.format, tex.type, imgs[1]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, lvl, tex.internal, tex.format, tex.type, imgs[2]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, lvl, tex.internal, tex.format, tex.type, imgs[3]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, lvl, tex.internal, tex.format, tex.type, imgs[4]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, lvl, tex.internal, tex.format, tex.type, imgs[5]);
      w /= 2;
    }

    for (let i = 0; i < targetMipCount - surfcount; i++) {
      let d = new Uint8Array((w * w) * 4);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, surfcount + i, tex.internal, w, w, 0, tex.format, tex.type, d);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, surfcount + i, tex.internal, w, w, 0, tex.format, tex.type, d);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, surfcount + i, tex.internal, w, w, 0, tex.format, tex.type, d);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, surfcount + i, tex.internal, w, w, 0, tex.format, tex.type, d);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, surfcount + i, tex.internal, w, w, 0, tex.format, tex.type, d);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, surfcount + i, tex.internal, w, w, 0, tex.format, tex.type, d);
      w /= 2;
    }

    this.iblDef.env = tex;

    this.iblDef.ibl = new IblPmrem(tex, this.iblDef.sh);
    this.iblDef.ibl.shMode = "SH9";

  }

}



// ======
// LOADER
// ======
class IBLLoader {

  static async load(loader: GltfLoader, lightData: IEXT_LIB_Light): Promise<IBLElement> {

    const iblSource: IIBLSource = {
      size: lightData.specularImageSize,
      surfaces: []
    }

    const images = lightData.specularImages;

    function imgResolver(
      surfaces: TexImageSource[][],
      surfIdx: number,
      imgIdx: number
    ) {
      const surf = surfaces;
      const sidx = surfIdx;
      const iidx = imgIdx;
      return function(source: Image) {
        surf[sidx][iidx] = source.texImageSource;
      }
    }

    const promises = [];
    for (let i = 0; i < images.length; i++) {

      iblSource.surfaces[i] = [];

      for (let j = 0; j < images[i].length; j++) {

        promises.push(
          loader.getElement(GltfTypes.IMAGE, images[i][j])
            .then(imgResolver(iblSource.surfaces, i, j))
        )

      }

    }

    await Promise.all(promises);

    const def = new IBLElement();
    def.source = iblSource;
    const coeffs = lightData.irradianceCoefficients;

    let sh = new Float32Array(9 * 3);

    let idx = 0;
    for (let i = 0; i < coeffs.length; i++) {
      for (let j = 0; j < coeffs[i].length; j++) {
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
  readonly priority: number = 2;

  loader: GltfLoader;
  lights: IBLCollection;

  readonly disabled: boolean = false;

  constructor(gltfLoader: GltfLoader) {
    this.loader = gltfLoader;

    const capa = this.loader.gltfIO.capabilities;
    this.disabled = capa && !capa.isWebgl2;
    if (this.disabled)
      return;

    this.lights = new IBLCollection();
    gltfLoader.gltf.extras.lightsImageBased = this.lights;

  }

  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;
  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    if (this.disabled)
      return null;

    if (data.gltftype === GltfTypes.SCENE && data.extensions && data.extensions[EXT_ID]) {
      const scene = new IBLScene();
      return scene.parse(this.loader, data).then(() => scene);
    }
    return null;
  }


  _getLightData(index: number): IEXT_LIB_Light {
    if (this.disabled)
      return null;
    const lightDatas: IEXT_LIB_Extension = this.loader._data.extensions?.[EXT_ID];
    if (lightDatas === undefined) throw new Error(EXT_ID + ' no extension data');
    return lightDatas.lights[index];
  }


  async _createLight(iData: IEXT_LIB_LightInstance) {
    if (this.disabled)
      return null;

    const lightData: IEXT_LIB_Light = this._getLightData(iData.light);

    var iblElement = await IBLLoader.load(this.loader, lightData);
    this.lights.addLight(iblElement, lightData.name ? lightData.name : "ibl-" + this.lights.list.length);

    return iblElement;
  }


  acceptElement<P extends Gltf2.Property>(data: P, element: ElementOfType<PropertyType<P>>): null | Promise<ElementOfType<PropertyType<P>>>;
  async acceptElement(data: Gltf2.Property, element: Scene | IBLScene): null | Promise<Scene> {

    if (this.disabled || data.gltftype !== GltfTypes.SCENE)
      return element;

    if (data.extensions && data.extensions[EXT_ID]) {
      (element as IBLScene).setIblDef(await this._createLight(data.extensions[EXT_ID]));
    }

    return element;

  }

}



export default class EXT_lights_image_based implements IExtensionFactory {
  readonly name: string = EXT_ID;
  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new Instance(gltfLoader);
  }
}