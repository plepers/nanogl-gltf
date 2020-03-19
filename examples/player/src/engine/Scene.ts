
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
import { mat4, vec3 } from 'gl-matrix'
import { Passes, Masks } from './Passes'
import Gltf from 'nanogl-gltf'
import GltfIO from "nanogl-gltf/io/web";
import GLConfig from 'nanogl-state/config'
import Program from 'nanogl/program'
import Bounds, { BoundingSphere } from 'nanogl-pbr/Bounds'
import Animation from 'nanogl-gltf/elements/Animation'

import KHR_texture_transform from 'nanogl-gltf/extensions/KHR_texture_transform'
import KHR_draco_mesh_compression from 'nanogl-gltf/extensions/KHR_draco_mesh_compression'

   


Program.debug = true;

Gltf.addExtension( new KHR_texture_transform() );
Gltf.addExtension( new KHR_draco_mesh_compression() );


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
  bounds      : Bounds
  animationTime :number;
  animationDuration :number;

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
    
    this.envRotation = Math.PI/2

    // CONTROLERS
    // ======
    this.camCtrl = new CameraControler  (this              )
    // this.xpcam   = new OrbitControler(this              )
    this.maxcam  = new MaxControler  (this.glview.canvas)
    

    // GRAPH
    // ======
    this.root.add( this.mainCamera )
    this.root.add( this.devCamera )
    this.sroot.add( this.root )

    this.root.rotation.set([0, 0, 0, 1])
    this.root.rotateY(this.envRotation)
    // this.root .add( this.tree      .node );

    // this.camCtrl.setControler(this.maxcam);

    this.inputs.start();

  }
  
  
  
  async load( ){
    await this.iblMngr.load( 'Helipad' );
    // await this.loadGltf( 'models/Avocado.glb' )
  }

  async loadGltf( url : string ){
    if( this.gltfScene ){
      this.root.remove( this.gltfScene.root )
      this.gltfScene = null;

      this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );
    }

    this.gltfScene = await GltfIO.loadGltf( url );
    await this.gltfScene.allocateGl( this.gl )
    this.root.add( this.gltfScene.root );
    this.setupMaterials()
    this.computeBounds()
    this.initCamera()

    this.animationTime = 0;
    this.animationDuration = 0;
    for( const anim of this.gltfScene.animations ){
      this.animationDuration = Math.max( this.animationDuration, anim.duration );
    }
  }

  setupMaterials() {
    for (const material of this.gltfScene.materials ) {
      (material as any).materialPass.setIBL( this.iblMngr.ibl )
    }
  }

  computeBounds() {

    this.root.updateWorldMatrix();
    this.bounds = new Bounds();
    const b : Bounds = new Bounds();
    Bounds.transform( this.bounds, this.gltfScene.renderables[0].bounds, this.gltfScene.renderables[0].node._wmatrix )
    for (const renderable of this.gltfScene.renderables ) {
      Bounds.transform( b, renderable.bounds, renderable.node._wmatrix )
      Bounds.union( this.bounds, this.bounds, b );
    }
  }

  initCamera(){
    const bs = new BoundingSphere();
    BoundingSphere.fromBounds( bs, this.bounds );
    const maxRadius = Math.max( ...bs.radius )
    vec3.add( this.devCamera.position,  <vec3>bs.center, vec3.fromValues(0, maxRadius * 1, maxRadius * 5 ) );
    this.maxcam.stop();
    
    const m4 = mat4.create()
    mat4.invert( m4, this.devCamera._parent._wmatrix )
    vec3.transformMat4( bs.center, bs.center, m4 )
    
    this.devCamera.lookAt( bs.center );
    this.devCamera.invalidate();
    this.maxcam.orbitRadius = -maxRadius * 5;
    this.maxcam.panSensitivity = maxRadius * 5
    this.devCamera.lens.far = maxRadius * 10
    this.devCamera.lens.near = maxRadius / 10
    this.camCtrl.setControler(this.maxcam)
  }


 
  render(dt) {

    this.dt = dt;
    this.time += dt;

    
    if( this.gltfScene ) {

      this.animationTime += dt
      if( this.animationTime > this.animationDuration ) this.animationTime = 0;
      for( const anim of this.gltfScene.animations ){
        anim.evaluate( this.animationTime)
      }

      this.drawScene( this.camera );
    }

  }



  drawScene( camera : Camera, fbo = null, force = false ){


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
    // this.gltfScene.renderables[5].render( this, camera, mask, passId, cfg )
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




