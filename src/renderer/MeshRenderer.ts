import Node from "../elements/Node"
import Mesh from "../elements/Mesh"
import Primitive from "../elements/Primitive"
import Camera from 'nanogl-camera'
import Material from 'nanogl-pbr/Material'
import MorphDeformer from 'nanogl-pbr/MorphDeformer'
import SkinDeformer, { SkinAttributeSet } from 'nanogl-pbr/SkinDeformer'
import { GLContext } from "nanogl/types"
import Assert from "../lib/assert"
import Program from "nanogl/program"
import Bounds from "nanogl-pbr/Bounds"
import { MorphAttributeType, MorphAttribInfos, MorphAttributeName } from "nanogl-pbr/MorphCode"
import GLState from 'nanogl-state/GLState'
import GLConfig from "nanogl-state/GLConfig"
import Gltf from "../Gltf"




function assertIsNumComps( n : number ) : asserts n is 1|2|3|4 {
  if( n<1 || n>4 ) throw new Error('number is not Component size')
}

function assertSemanticCanBeMorphed( s : string ) : asserts s is MorphAttributeName {
  if( s !== 'position' && s !== 'normal' && s !== 'tangent' ) throw new Error(`semantic ${s} can't be morphed`)
}



/**
 * A MeshRenderer is a renderable object that contains a mesh and its rendering properties.
 */
export default class MeshRenderer {

  /**
   * The node that contains the mesh
   */
  readonly node: Node;

  /**
   * The mesh to render
   */
  readonly mesh: Mesh;

  private _skinDeformers = new Map<Primitive, SkinDeformer>();
  private _morphDeformers = new Map<Primitive, MorphDeformer>();
  
  /**
   * All the materials used by this Mesh's primitives
   */
  materials : Material[] = []
  
  /**
   * Custom GLConfig to use when rendering this mesh
   */
  glconfig? : GLConfig;

  /**
   * The bounds of this mesh
   */
  readonly bounds : Bounds = new Bounds();

  /**
   * @param gtlf GLTF file where this mesh comes from
   * @param node Node that contains this mesh
   */  
  constructor( gtlf : Gltf, node: Node) {
    Assert.isDefined( node.mesh );
    this.node = node;
    this.mesh = node.mesh;
    
    this.setupMaterials( gtlf );
    this.computeBounds();
  }


  // TODO: if no deformer, a single material instance can be shared between renderers
  /**
   * For each primitives, create a material based on primitive's material pass.
   * If skin or morph targets are present, deformers are set on the created material.
   */
  setupMaterials(gtlf : Gltf) {
    for (const primitive of this.mesh.primitives ) {
      const material = primitive.material.createMaterialForPrimitive( gtlf, this.node, primitive );
      this.configureDeformers( material, primitive );
      this.materials.push( material );
    }

  }

  /**
   * Configure the SkinDeformers and MorphDeformers on the material, if the node has skinning or the primitive has morph targets.
   * @param material Material to configure
   * @param primitive Primitive to get the skinning data and morph targets from
   */
  configureDeformers(material: Material, primitive: Primitive) {
    this.configureSkin ( material, primitive );
    this.configureMorph( material, primitive );
  }

  /**
   * If the primitive has morph targets, create a nanogl-pbr MorphDeformer and add it to the material.
   * @param material Material on which the MorphDeformer will be added
   * @param primitive Primitive to get the morph targets from
   */
  configureMorph(material: Material, primitive: Primitive) {

    if( primitive.targets !== null ){
      
      // console.log("CONFIGURING MORPH : ", primitive);
      const morphedAttribs = primitive.targets[0].attributes;
      const morphInfos : MorphAttribInfos[] = [];
      
      for (const morphedattrib of morphedAttribs) {
        
        const miAttributes = primitive.targets.map( (target)=>{
          return target.getSemantic( morphedattrib.semantic ).glslname
        });
        
        const aname : string = morphedattrib.semantic.toLowerCase()
        assertSemanticCanBeMorphed( aname );
        
        const morphInfo :MorphAttribInfos = {
          name : aname,
          type : morphedattrib.accessor.glslType as MorphAttributeType,
          attributes : miAttributes,
        }
        
        morphInfos.push( morphInfo );
      }
      
      const morphDeformer = new MorphDeformer( morphInfos );
      

      material.inputs.add( morphDeformer );
      this._morphDeformers.set( primitive, morphDeformer );

      this.setupMorphWeights(morphDeformer);
    }
    
  
  }

  /**
   * Get the morph weights from the node or the mesh and set them on the nanogl-pbr MorphDeformer.
   * @param morph MorphDeformer to set the weights on
   */
  setupMorphWeights( morph:MorphDeformer) {
    if( this.node.weights ){
      morph.weights = this.node.weights 
    } else if( this.mesh.weights ){
      morph.weights = this.mesh.weights 
    }
  }

  /**
   * If the node has skinning, create a nanogl-pbr SkinDeformer and add it to the material.
   * @param material Material on which the SkinDeformer will be added
   * @param primitive Primitive to get the skinning data from (joints and weights)
   */
  configureSkin(material: Material, primitive: Primitive) {
    
    if( this.node.skin ){
      
      const numJoints = this.node.skin.joints.length;

      const attributeSet : SkinAttributeSet[] = [];
      
      let setIndex = 0
      while( true ){

        const wsem = 'WEIGHTS_'+setIndex;
        const jsem = 'JOINTS_' +setIndex;
        const weights = primitive.attributes.getSemantic( wsem );
        const joints  = primitive.attributes.getSemantic( jsem );
        
        if( (weights === null) !== (joints === null) ){
          throw new Error('Skin attributes inconsistency')
        }

        if( weights === null ) break;
        
        if( weights.accessor.numComps !== joints.accessor.numComps){
          throw new Error('weight and joints attribute dont have the same size')
        }

        const numComponents = weights.accessor.numComps;
        assertIsNumComps( numComponents );

        attributeSet.push({
          weightsAttrib : weights.glslname,
          jointsAttrib  : joints .glslname,
          numComponents
        })
        setIndex++;
      }

      const skinDeformer = new SkinDeformer(numJoints, attributeSet)
      // add skin deformer
      //material.setSkin ...
      material.inputs.add( skinDeformer );
      this._skinDeformers.set( primitive, skinDeformer );
    }
    
  }

  /**
   * Compute the bounds of the mesh by merging the bounds of all its primitives.
   */
  computeBounds() {
    this.bounds.copyFrom( this.mesh.primitives[0].bounds )
    for (const primitive of this.mesh.primitives ) {
      Bounds.union( this.bounds, this.bounds, primitive.bounds );
    }
  }

  
  /**
   * Render the mesh.
   * @param gl GLContext to use for rendering
   * @param camera Camera from which the mesh will be rendered
   * @param mask Render mask to use (Opaque, Blended, ...)
   * @param passId ID of the current rendering pass (Color, Depth, ...)
   * @param glconfig Custom GLConfig to use for rendering
   */
  render( gl:GLContext, camera:Camera, mask:number, passId : string,  glconfig?:GLConfig ) : void {

    
    const primitives = this.mesh.primitives;
    
    
    const glstate = GLState.get(gl)
    
    for (let i = 0; i < primitives.length; i++) {
      const primitive = primitives[i];

      if( this._skinDeformers.has(primitive) ){
        this.node.skin.computeJoints( this.node, this._skinDeformers.get(primitive).jointMatrices );
      }
      
      if (this._morphDeformers.has(primitive)) {
        this.setupMorphWeights( this._morphDeformers.get(primitive) );
      }

      const mat:Material = this.materials[i];
      
      if ( !mat.hasPass( passId ) || (mat.mask & mask) === 0)  continue;
      
      const passInstance = mat.getPass( passId );
      
      if ((passInstance.pass.mask & mask) === 0) continue;

      passInstance.prepare( this.node, camera )


      // push configs
      // -------------


      glstate.push( passInstance.pass.glconfig );
      mat.glconfig  && glstate.push(mat.glconfig);
      this.glconfig && glstate.push(this.glconfig);
      glconfig      && glstate.push(glconfig);
      
      glstate.apply()
      
      // render
      // ----------
      this.drawCall(camera, passInstance.getProgram(), primitive);
      
      // pop configs
      // -------------
      
      glstate.pop();
      mat.glconfig  && glstate.pop();
      this.glconfig && glstate.pop();
      glconfig      && glstate.pop();

    }

  }


  /**
   * Draw a primitive with a program.
   * Low-level function, binding the Primitive's VAO before rendering, and unbinding it after.
   * @param camera Camera to use for rendering, unused here
   * @param prg Program to bind for rendering
   * @param sub Primitive to render
   */
  drawCall( camera:Camera, prg:Program, sub:Primitive ) {
    sub.bindVao( prg );
    sub.render();
    sub.unbindVao();
  }

}