import IBL        from './Ibl'

import NGL_IBL    from 'nanogl-pbr/Ibl'
import Input      from 'nanogl-pbr/Input'
import Enum       from 'nanogl-pbr/Enum'
import Texture2D    from 'nanogl/texture-2d'
import Scene from './Scene'
import { GLContext } from 'nanogl/types'
import StandardPass from 'nanogl-pbr/StandardPass'
import { GammaModes, GammaModeEnum } from 'nanogl-pbr/GammaModeEnum'
import {IO} from "../../../../src/io/web";





const INITIAL_IDX = 0;

const ENVS = [
  'Helipad',
]



const EXPO = 5
const GAMMA = 2.2

class Env{

  scene: Scene
  gl: GLContext

  envTex: Texture2D
  envHi: Texture2D
  envBg: Texture2D
  
  ibl: IBL
  shMul: number
  gammaMode: GammaModeEnum
  gamma: Input
  exposure: Input
  shBase: any
  expoUniform: any
  gammaUniform: any
  
  constructor( scene:Scene ){

    const gl = scene.gl;

    this.scene = scene;
    this.gl = gl;
    
    this.envTex = new Texture2D( this.gl, this.gl.RGBA );
    this.envHi  = new Texture2D( this.gl, this.gl.RGBA );
    this.envBg  = new Texture2D( this.gl, this.gl.RGB );
    
    this.ibl    = new IBL( this.envTex, this.envHi, this.envBg );

    this.envTex.setFilter( false );

    this.shMul = 1.0;


    this.gammaMode  = new Enum( 'gammaMode', GammaModes);
    this.gamma      = new Input( 'gamma',       1, Input.ALL );
    this.exposure   = new Input( 'exposure',    1, Input.ALL );

    this.expoUniform  = this.exposure .attachUniform( 'utmExpo' ).set( EXPO );
    this.gammaUniform = this.gamma   .attachUniform( 'uTMGamma' ).set( 1/GAMMA );
    this.gammaMode.set( 'GAMMA_STD' )

  }



  setupMat( m : StandardPass ){

    m.iGamma   .proxy( this.gamma )
    m.iExposure.proxy( this.exposure )
    m.gammaMode.proxy( this.gammaMode )

  }

  dispose(){

    this.envTex .dispose();
    this.envHi  .dispose();
    this.envBg  .dispose();

    this.envTex = null;
    this.envHi  = null;
    this.envBg  = null;

    this.ibl    = null;
    this.scene  = null;
    
    this.shBase = null;
    this.shMul  = 1.0;

  }


  loadDefault(){
    return this.load( ENVS[INITIAL_IDX] )
  }


  load( dir:string ){
    
    return Promise.all([
      IO.loadImage( `envs/${dir}/env.png` ).then( (img:TexImageSource)=>this.envTex.fromImage(img) ),
      IO.loadBinaryResource( `envs/${dir}/sh.bin`  ).then( this.convertSH )
      // Net.loadImage( Config.asset_url( dir+'/bg.jpg' ) ).then( (img)=>this.envBg.fromImage(img) ),
      // Net.loadImage( Config.asset_url( dir+'/env_hi.png' ) ).then( (img)=>this.envHi.fromImage(img) ),
    ]);

  }

  convertSH = (buf) => {
    this.shBase = new Float32Array(buf, 0, 9*3);
    this.ibl.sh = NGL_IBL.convert(this.shBase, this.shMul );
  }



}

export default Env;