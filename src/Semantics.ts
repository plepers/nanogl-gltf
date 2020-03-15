
const Semantics = {
  POSITION :{indexed:false, attrib:'aPosition'  },
  NORMAL   :{indexed:false, attrib:'aNormal'    },
  TANGENT  :{indexed:false, attrib:'aTangent'   },
  TEXCOORD :{indexed:true , attrib:'aTexCoord'  },
  COLOR    :{indexed:true , attrib:'aColor'     },
  JOINT    :{indexed:false, attrib:'aSkinJoint' },
  WEIGHT   :{indexed:false, attrib:'aSkinWeight'},
}


export interface ISemantics {
  getAttributeName( semantic:string):string;
}


export class DefaultSemantics implements ISemantics {
  
  getAttributeName(semantic: string): string {
    const [basename, set_index=0] = semantic.split( '_' );
    const infos = Semantics[basename];

    if( infos !== undefined ) {
      if( set_index > 0 || infos.indexed )
        return infos.attrib+set_index;
      return infos.attrib
    }
    throw new Error(`Invalid Semantic ${semantic}`)
    // return semantic;
  }

}