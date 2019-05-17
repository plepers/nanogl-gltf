import { ElementType } from "../consts";
// export function BaseElementExtend( C:any = Object ){
//   return class extends C {
//     static TYPE : ElementType = ElementType.TYPE_NONE;
//     gltf       : Gltf  ;
//     name       : string;
//     extras     : any   ;
//     extensions : any   ;
//     constructor( gltf : Gltf, data : any ){
//       super();
//       this.gltf = gltf;
//       this.name       = data.name      
//       this.extras     = data.extras    
//       this.extensions = data.extensions
//     }
//     get elementType() : ElementType {
//       return this.constructor['TYPE'];
//     }
//   }
// }
// const BaseElement = BaseElementExtend();
let UID = 0;
class BaseElement {
    constructor(gltf, data) {
        this.uid = BaseElement.CreateUID();
        this.gltf = gltf;
        this.name = data.name;
        this.extras = data.extras;
        this.extensions = data.extensions;
    }
    static CreateUID() {
        return UID++;
    }
    get elementType() {
        return this.constructor['TYPE'];
    }
}
BaseElement.TYPE = ElementType.NONE;
export default BaseElement;
