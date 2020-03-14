import Node from "../elements/Node"
import Mesh from "../elements/Mesh"
import Primitive from "../elements/Primitive"
import GLConfig from 'nanogl-state/config'
import Camera from 'nanogl-camera'
import BaseMaterial from 'nanogl-pbr/BaseMaterial'
import { GLContext } from "nanogl/types"
import Assert from "../lib/assert"
import Program from "nanogl/program"
import IRenderable, { IRenderingContext } from "./IRenderable"





export default class MeshRenderer implements IRenderable {
  
  node: Node;
  mesh: Mesh;
  
  materials : BaseMaterial[] = []
  
  glconfig? : GLConfig;
  
  constructor( gl : GLContext, node: Node) {
    Assert.isDefined( node.mesh );
    this.node = node;
    this.mesh = node.mesh;
    
    this.setupMaterials( gl );
  }
  
  /**
   * for each primitives, create a material based on primitive's material pass
   * if skin or morph target are present, deformers are set on the created material
   * TODO: if no deformer, a single material instance can be shared between renderers
   */
  setupMaterials(gl : GLContext) {
    
    for (const primitive of this.mesh.primitives ) {

      const pass = primitive.material.materialPass;
      const material = new BaseMaterial( gl, pass.name );
      material.addPass( pass, 'color' )
      this.materials.push( material );

    }

  }


  render( context:IRenderingContext, camera:Camera, mask:number, passId : string,  glconfig?:GLConfig ) : void {

    const glstate = context.glstate;

    const primitives = this.mesh.primitives;
    

    for (let i = 0; i < primitives.length; i++) {

      const primitive = primitives[i];
      const mat:BaseMaterial = this.materials[i];
      
      if ( !mat.hasPass( passId ) || (mat.mask & mask) === 0)  continue;
      
      const passInstance = mat.getPass( passId );
      
      if ((passInstance.pass.mask & mask) === 0) continue;

      passInstance.prepare( this.node, camera )


      // push configs
      // -------------

      mat.glconfig  && glstate.push(mat.glconfig);
      this.glconfig && glstate.push(this.glconfig);
      glconfig      && glstate.push(glconfig);

      glstate.apply()

      // render
      // ----------
      this.drawCall(camera, passInstance.getProgram(), primitive);

      // pop configs
      // -------------

      mat.glconfig  && glstate.pop();
      this.glconfig && glstate.pop();
      glconfig      && glstate.pop();

    }

  }


  drawCall( camera:Camera, prg:Program, sub:Primitive ) {
    sub.bindVao( prg );
    sub.render();
    sub.unbindVao();
  }


}