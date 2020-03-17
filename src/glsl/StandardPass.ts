



import vShader            from './standard.vert'
import fShader            from './standard.frag'

import mat4               from 'gl-matrix/src/gl-matrix/mat4'

import  Input          from 'nanogl-pbr/Input'
import  Flag           from 'nanogl-pbr/Flag'
import  Enum           from 'nanogl-pbr/Enum'
import {GammaModeEnum} from 'nanogl-pbr/GammaModeEnum'
import  Precision      from 'nanogl-pbr/ShaderPrecision'
import  Version        from 'nanogl-pbr/ShaderVersion'
import  TexCoordCollection   from 'nanogl-pbr/TexCoordCollection'
import  MaterialPass   from 'nanogl-pbr/MaterialPass'
import  Program        from 'nanogl/program'
import  Node           from 'nanogl-node'
import  Camera         from 'nanogl-camera'
import  IBL            from 'nanogl-pbr/Ibl'
import  LightSetup     from 'nanogl-pbr/LightSetup'


const M4 = mat4.create();

const MAT_ID = 'std';

/**
 * @extends {BaseMaterial}
 */
export default class StandardPass extends MaterialPass {


  texCoords            : TexCoordCollection
  ibl                  : IBL
  version              : Version
  precision            : Precision
  shaderid             : Flag
  baseColor            : Input
  baseColorFactor      : Input
  alpha                : Input
  alphaFactor          : Input
  alphaCutoff          : Input
  metalness            : Input
  metalnessFactor      : Input
  roughness            : Input
  roughnessFactor      : Input
  emissive             : Input
  emissiveFactor       : Input
  normal               : Input
  normalScale          : Input
  occlusion            : Input
  occlusionStrength    : Input
  iGamma               : Input
  iExposure            : Input

  alphaMode: Enum<readonly ["OPAQUE", "MASK", "BLEND"]>

  doubleSided   : Flag
  conserveEnergy: Flag
  perVertexIrrad: Flag
  glossNearest  : Flag
  noFresnel     : Flag
  horizonFading : Flag
  useDerivatives: Flag
  
  gammaMode: GammaModeEnum

  // private _uvs : Map<number, UVTransform> = new Map()

  constructor( name : string = 'gltf-std-pass' ){

    super( {
      uid  : MAT_ID,
      vert : vShader(),
      frag : fShader(),
    } );

    this.ibl = null;


    const inputs = this.inputs;

    this.texCoords = new TexCoordCollection( inputs );

    inputs.add( this.version         = new Version( '100' ) );
    inputs.add( this.precision       = new Precision( 'highp' ) );
    inputs.add( this.shaderid        = new Flag ( 'id_'+MAT_ID,  true  ) );

    // inputs.add( this.iTexCoord0      = new UVTransform( 'aTexCoord0', 'vTexCoord0' ) );




    inputs.add( this.baseColor             = new Input( 'baseColor'              , 3 ) );
    inputs.add( this.baseColorFactor       = new Input( 'baseColorFactor'        , 3 ) );

    inputs.add( this.alpha                 = new Input( 'alpha'              , 1 ) );
    inputs.add( this.alphaFactor           = new Input( 'alphaFactor'        , 1 ) );
    inputs.add( this.alphaCutoff           = new Input( 'alphaCutoff'        , 1 ) );

    inputs.add( this.metalness              = new Input( 'metalness'        , 1 ) );
    inputs.add( this.metalnessFactor        = new Input( 'metalnessFactor'     , 1 ) );

    inputs.add( this.roughness             = new Input( 'roughness'     , 1 ) );
    inputs.add( this.roughnessFactor       = new Input( 'roughnessFactor'     , 1 ) );
    
    inputs.add( this.emissive              = new Input( 'emissive'     , 3 ) );
    inputs.add( this.emissiveFactor        = new Input( 'emissiveFactor'     , 3 ) );

    inputs.add( this.normal                = new Input( 'normal'              , 3 ) );
    inputs.add( this.normalScale           = new Input( 'normalScale'              , 1 ) );

    inputs.add( this.occlusion             = new Input( 'occlusion'           , 1 ) );
    inputs.add( this.occlusionStrength     = new Input( 'occlusionStrength'           , 1 ) );
    
    inputs.add( this.iGamma                = new Input( 'gamma'               , 1 ) );
    inputs.add( this.iExposure             = new Input( 'exposure'            , 1 ) );


    inputs.add( this.alphaMode      = new Enum( 'alphaMode', [
      "OPAQUE",
      "MASK",
      "BLEND"
    ] as const ));

    inputs.add( this.doubleSided  = new Flag ( 'doubleSided',  false ) );


    inputs.add( this.conserveEnergy  = new Flag ( 'conserveEnergy',  false ) );
    inputs.add( this.perVertexIrrad  = new Flag ( 'perVertexIrrad',  false ) );
    inputs.add( this.glossNearest    = new Flag ( 'glossNearest',    false ) );
    inputs.add( this.noFresnel       = new Flag ( 'noFresnel'   ,    false ) );
    inputs.add( this.horizonFading   = new Flag ( 'horizonFading' ,  false ) );
    inputs.add( this.useDerivatives  = new Flag ( 'useDerivatives',  false ) );

    inputs.add( this.gammaMode       = new Enum( 'gammaMode',[
      'GAMMA_NONE',
      'GAMMA_STD',
      'GAMMA_2_2',
      'GAMMA_TB'
    ] as const ) ).set( 'GAMMA_2_2' );

  }

  
  // getTexCoords( index = 0 ) : string {
  //   let tc = this._uvs.get( index );
  //   if( tc === undefined ){
  //     tc  = new UVTransform( 'aTexCoord'+index, 'vTexCoord'+index ) 
  //     this.inputs.add( tc );
  //     this._uvs.set( index, tc );
  //   }
  //   return tc.token();
  // }

  /**
   * 
   * @param {Ibl} ibl 
   */
  setIBL( ibl:IBL ){
    this.ibl = ibl;
  }


  setLightSetup( setup : LightSetup ){
    this.inputs.addChunks( setup.getChunks( 'std' ) );
  }

  
  prepare( prg:Program, node : Node, camera : Camera ){
    
    this.ibl.setupProgram( prg );
    
    // matrices
    
    if( prg.uMVP ){
      camera.modelViewProjectionMatrix( M4, node._wmatrix );
      prg.uMVP(          M4            );
    }
    
    if( prg.uWorldMatrix )
      prg.uWorldMatrix( node._wmatrix );
    
    if( prg.uVP )
      prg.uVP( camera._viewProj );
    
    if( prg.uCameraPosition )
      prg.uCameraPosition( camera._wposition );
  

  }


};

