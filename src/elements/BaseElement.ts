import { ElementType } from "../consts";
import Gltf from "../index";


let UID = 0;


type Constructor<T = {}> = new (...args: any[]) => T;

function ElementMixin<TBase extends Constructor>(Base: TBase) {

  return class extends Base {


    static CreateUID() : number {
      return UID++;
    }

    static TYPE : ElementType = ElementType.NONE;


    uid         : number;
    gltf        : Gltf  ;

    name?       : string;
    extras?     : any   ;
    extensions? : any   ;


    parse( gltf : Gltf, data : any, ...args : any ){

      this.uid = BaseElement.CreateUID();

      this.gltf = gltf;

      this.name       = data.name      
      this.extras     = data.extras    
      this.extensions = data.extensions

    }


    get elementType() : ElementType {
      return this.constructor['TYPE'];
    }

  }

}

export {ElementMixin};

export default class BaseElement extends ElementMixin(Object) {}