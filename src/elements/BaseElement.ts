import { ElementType } from "../consts";
import Gltf from "../index";


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


class BaseElement {


  static TYPE : ElementType = ElementType.NONE;


  gltf       : Gltf  ;
  name       : string;
  extras     : any   ;
  extensions : any   ;


  constructor( gltf : Gltf, data : any ){


    this.gltf = gltf;

    this.name       = data.name      
    this.extras     = data.extras    
    this.extensions = data.extensions

  }


  get elementType() : ElementType {
    return this.constructor['TYPE'];
  }


}


export default BaseElement;
