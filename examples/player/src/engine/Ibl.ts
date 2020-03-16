

import NGL_IBL from 'nanogl-pbr/Ibl'
import Texture2D from 'nanogl/texture-2d';
import Program from 'nanogl/program';


export default class IBL extends NGL_IBL {

  envHi: Texture2D;
  envBg: Texture2D;

  constructor( env:Texture2D, envHi:Texture2D, envBg:Texture2D ){
    super( env, null );
    this.envHi   = envHi;
    this.envBg   = envBg;
  }


  setupProgram( prg: Program ){

    super.setupProgram( prg );
    
    if( prg.tEnvHi )
      prg.tEnvHi( this.envHi );

  }

}
