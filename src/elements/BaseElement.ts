import Gltf from "../index";
import Gltf2 from "../types/Gltf2";
import GltfLoader from "../io/GltfLoader";
import GltfTypes from "../types/GltfTypes";


type Constructor<T = {}> = new (...args: any[]) => T;

function ElementMixin<TBase extends Constructor>(Base: TBase) {

  return class extends Base implements Gltf2.IChildRootProperty {


    readonly gltftype : GltfTypes;
    uuid         : string;

    gltf        : Gltf  ;

    name?       : string;
    extras?     : any   ;
    extensions? : Record<string,any>;


    parse( gltfLoader : GltfLoader, data : Gltf2.IProperty, ...args : any ){

      this.uuid = data.uuid;

      this.gltf = gltfLoader.gltf;

      this.name       = (data as any).name ?? ""
      this.extras     = data.extras    
      this.extensions = data.extensions

    }


  }

}

export {ElementMixin};

export default class BaseElement extends ElementMixin(Object) {}