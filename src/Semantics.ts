
const Semantics = {
  POSITION :{indexed:false, attrib:'aPosition'   },
  NORMAL   :{indexed:false, attrib:'aNormal'     },
  TANGENT  :{indexed:false, attrib:'aTangent'    },
  TEXCOORD :{indexed:true , attrib:'aTexCoord'   },
  COLOR    :{indexed:true , attrib:'aColor'      },
  JOINTS   :{indexed:true , attrib:'aSkinJoints' },
  WEIGHTS  :{indexed:true , attrib:'aSkinWeights'},
}

/**
 * An interface to handle GLTF semantics, it means the name of GLSL attributes
 */
export interface ISemantics {

  /**
   * Method to get the GLSL attribute name for a morphed attribute with a given semantic and index.
   * @param semantic Attribute semantic
   * @param index Index of the morph target
   */
  getMorphedAttributeName(semantic: string, index : number):string

  /**
   * Method to get the GLSL attribute name for an attribute with a given semantic.
   * @param semantic Attribute semantic
   */
  getAttributeName( semantic:string):string
  
}

/**
 * The default implementation of ISemantics.
 * 
 * It uses the following convention: POSITION = aPosition, NORMAL = aNormal, TANGENT = aTangent, TEXCOORD = aTexCoord, COLOR = aColor, JOINTS = aSkinJoints, WEIGHTS = aSkinWeights
 */
export class DefaultSemantics implements ISemantics {

  /**
   * Get the GLSL attribute name for a morphed attribute with a given semantic and index.
   * Typically the same as getAttributeName but with a suffix _mt{index}
   * @param semantic Attribute semantic
   * @param index Index of the morph target
   */
  getMorphedAttributeName(semantic: string, index : number){
    return this.getAttributeName( semantic )+'_mt'+index;
  }
  
  /**
   * Get the GLSL attribute name for an attribute with a given semantic.
   * If the semantic is indexed, it will be suffixed with the set index (e.g. TEXCOORD_0 -> aTexCoord0)
   * @param semantic Attribute semantic
   */
  getAttributeName(semantic: string ): string {
    const [basename, set_index=0] = semantic.split( '_' );
    const infos = Semantics[basename as keyof typeof Semantics];

    if( infos !== undefined ) {
      if( set_index > 0 || infos.indexed )
        return infos.attrib+set_index;
      return infos.attrib
    }
    throw new Error(`Invalid Semantic ${semantic}`)
    // return semantic;
  }

}