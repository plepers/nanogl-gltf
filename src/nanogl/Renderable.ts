import Node from "../elements/Node";
import Primitive from "./Primitive";
import ElementImpl from "./ElementImpl";
import Mesh from "../elements/Mesh";
import { ICamera } from "./ICamera";



export interface IRenderable {
  render( glstate, camera : ICamera, mask : number, cfg );
}



export class MeshRenderable extends ElementImpl<Mesh> implements IRenderable {
  
  node : Node;

  primitives : Primitive[];

  constructor( gltfMesh : Mesh ){
    super( gltfMesh )
  }



  render( glstate, camera, mask, cfg ) {

    
    for( var prim of this.primitives ){
      
      var mat = prim.material;

      if ((mat._mask & mask) === 0) {
        continue;
      }


    }
  }


}