
import GLState        from 'nanogl-state'
import Node           from 'nanogl-node'
import Camera         from 'nanogl-camera'

import IBLManager       from './Env'
import Inputs           from './inputs'
import MaxControler     from './MaxController'
import CameraControler  from './CameraController'
import GLView           from './GLView'


import { GLContext } from 'nanogl/types'
import PerspectiveLens from 'nanogl-camera/perspective-lens'
import { mat4 } from 'gl-matrix'
import { Passes, Masks } from './Passes'
import Gltf from 'nanogl-gltf'
import GltfIO from "nanogl-gltf/io/web";
import GLConfig from 'nanogl-state/config'
import Program from 'nanogl/program'



Program.debug = true;


export default class Scene {
  
  dt    : number
  time  : number
  ratio : number
  glview      : GLView
  gl          : GLContext
  mainCamera  : Camera<PerspectiveLens>
  devCamera   : Camera<PerspectiveLens>
  camera      : Camera<PerspectiveLens>
  sroot       : Node
  root        : Node
  glstate     : GLState
  inputs      : Inputs
  iblMngr     : IBLManager
  camCtrl     : CameraControler
  maxcam      : MaxControler
  gltfScene   : Gltf;

  enableDebugDraw: boolean
  envRotation    : number


  constructor() {

    this.dt     = 0   ;
    this.time   = 0   ;
    this.ratio  = 1.0 ;

  }

  /**
   *
   * @param {import('glview').default} glview
   */
  init(glview : GLView) {


    this.glview = glview
    this.gl = this.glview.gl


    // CAMERA
    // ======
    this.mainCamera = this.makeCamera()
    this.devCamera  = this.makeCamera()
    this.camera     = this.devCamera


    this.sroot = new Node();
    this.root  = new Node();

    this.glstate     = new GLState(this.gl    );
    this.inputs      = new Inputs (this.glview.canvas );
    this.iblMngr     = new IBLManager ( this );
    
    this.envRotation = Math.PI

    // CONTROLERS
    // ======
    this.camCtrl = new CameraControler  (this              )
    // this.xpcam   = new OrbitControler(this              )
    this.maxcam  = new MaxControler  (this.glview.canvas)
    
    this.camCtrl.setControler(this.maxcam)

    // GRAPH
    // ======
    this.root.add( this.mainCamera )
    this.root.add( this.devCamera )
    this.sroot.add( this.root )
    // this.root .add( this.tree      .node );

    // this.camCtrl.setControler(this.maxcam);

    this.inputs.start();

  }
  
  
  
  async load( ){
    await this.iblMngr.load( 'Helipad' );
    // await this.loadGltf( 'models/Avocado.glb' )
    await this.loadGltf( 'models/FlightHelmet/FlightHelmet.gltf' )
  }

  async loadGltf( url : string ){
    this.gltfScene = await GltfIO.loadGltf( url );
    await this.gltfScene.allocateGl( this.gl )
    this.setupMaterials()
  }

  setupMaterials() {
    for (const material of this.gltfScene.materials ) {
      (material as any).materialPass.setIBL( this.iblMngr.ibl )
    }
  }

 
  render(dt) {

    this.dt = dt;
    this.time += dt;

    if( this.gltfScene )
      this.drawScene( this.camera );

  }



  drawScene( camera, fbo = null, force = false ){


    const gl = this.gl;
    const w = fbo ? fbo.width  : this.glview.width;
    const h = fbo ? fbo.height : this.glview.height;

    this.ratio = w / h;



    // preRender
    // =============
    this.camCtrl.preRender();
    // this.gltfSCene.preRender();


    // upadate graph
    // =================

    this.root.rotation.set([0, 0, 0, 1])
    this.root.rotateY(this.envRotation)
    this.sroot.updateWorldMatrix()
    this.gltfScene.root.updateWorldMatrix()


    camera.updateViewProjectionMatrix(w, h);
    
    // RTT
    // ==========
    
    // this.iblMngr.lights.setup.update();
    // this.renderShadowMaps()
    // this.glstate.apply()
    
    
    // RENDER
    // ========
    
    
    this.glstate.apply();
    gl.clearColor(.2, .2, .2, 1);
    
    // this.post.post.preRender(w, h);
    // this.post.post.bindColor()


    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo ? fbo.fbo : null);
    gl.viewport( 0, 0, w, h );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    
    //render stuffs
    this.renderGltfScene( camera, Masks.OPAQUE )
    this.renderGltfScene( camera, Masks.BLENDED )

    
    this.glstate.apply()
    // this.post.post.render()
    


    /// #if DEBUG
    if ((this.glstate.cfgStack as any)._ptr > 0) { throw new Error('glstate overflow') }
    /// #endif

  }

  renderGltfScene( camera : Camera, mask : Masks, passId : Passes = Passes.DEFAULT, cfg?: GLConfig ){
    for (const renderable of this.gltfScene.renderables ) {
      renderable.render( this, camera, mask, passId, cfg )
    }
  }



  // renderShadowMaps() {
  //   const gl = this.gl;
  //   const lights = this.iblMngr.lights;
  //   const depthpass = lights.depthPass;
  //   const glstate = this.glstate;

  //   const isRgb = lights.setup.depthFormat._val === 'D_RGB';
  //   lights.depthCfg.colorMask(isRgb, isRgb, isRgb, isRgb);

  //   for (var l of lights.list) {
  //     if (l._castShadows) {
  //       l.prepareShadowmap()
  //       // fbodebug.debug( l._fbo );
  //       gl.clearColor(1, 1, 1, 1);
  //       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //       glstate.push(lights.depthCfg);

  //       // render
  //       this.renderGltfScene( l._camera, Masks.SHADOW_CASTER, Passes.DEPTH )


  //       glstate.pop();

  //     }
  //   }
  //   glstate.apply();
  // }






  makeCamera() {
    // const camera = Camera.makePerspectiveCamera()
    const camera = Camera.makePerspectiveCamera();
    camera.lens.setAutoFov(35.0 / 180 * Math.PI) //80
    camera.lens.near = .001
    camera.lens.far = 3
    camera.position[2] = .5
    camera.invalidate()

    return camera
  }

}




