

import { GLContext } from 'nanogl/types';

const NOOP = ()=>{};


function now(){
  return performance.now();
}


class GLView {

  pixelRatio: number;
  gl: GLContext;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  canvasWidth: number;
  canvasHeight: number;
  previousTime: number;
  _rafId: number;
  _playing: boolean;
  scene: any;

  constructor( cvs : HTMLCanvasElement, {
    depth = true,
    alpha = false,
    pixelRatio = -1
  } = {} ){

    cvs.addEventListener("touchmove", e=>e.preventDefault() , false);

    if( pixelRatio <0 ){
      this.pixelRatio   = Math.min( 3.0, window.devicePixelRatio );
    } else {
      this.pixelRatio   = pixelRatio;
    }

    const opts = 
    {
      depth:                  depth ,
      antialias:              (this.pixelRatio < 2),
      stencil:                false,
      alpha:                  alpha,
      premultipliedAlpha:     false,
      preserveDrawingBuffer:  false
    }

    /**
     * @type {WebGLRenderingContext}
     */
    this.gl = <GLContext>(
      cvs.getContext( 'webgl2', opts ) ||
      cvs.getContext( 'webgl', opts ) ||
      cvs.getContext( 'webgl'));

    this.gl.clearColor( 1, 1, 1, 1 );
    this.gl.clear( this.gl.COLOR_BUFFER_BIT );

    this.canvas       = cvs;

    this.width        = 0;
    this.height       = 0;

    this.canvasWidth  = 0;
    this.canvasHeight = 0;

    this.previousTime = now();
    this._rafId       = 0;
    this._playing     = false;

    this.scene = null;

  }




  play() {
    // if( !this._playing ) {
      this._playing = true;
      this.frame();
      this.previousTime = now();
    // }
  }


  stop() {
    this._playing = false;
    this._rafId = 0;
  }


  updateSize(){
    const pr = this.pixelRatio;

    this.canvas.width  = Math.ceil( pr * this.canvasWidth / 4.0 ) * 4.0;
    this.canvas.height = Math.ceil( pr * this.canvasHeight / 4.0 ) * 4.0;
    this.width  = this.gl.drawingBufferWidth;
    this.height = this.gl.drawingBufferHeight;
  }



  _checkSize( ){

    const w = window.innerWidth;
    const h = window.innerHeight;
      // w = this.canvas.clientWidth;
      // h = this.canvas.clientHeight;
    
    //console.log( w, h )
    
    if( isNaN( w ) || isNaN( h ) || w === 0 || h === 0 ){
      return false;
    }
    if( w !== this.canvasWidth || h !== this.canvasHeight ){
      
      this.canvasWidth  = w;
      this.canvasHeight = h;
      this.updateSize();
    }
    return true;
  }


  _requestFrame( ){
    window.cancelAnimationFrame( this._rafId );
    this._rafId = window.requestAnimationFrame( this.frame );
  }


  frame = ()=>{
    if( ! this._playing ){
      return;
    }
    const time = now();
    let dt = (time - this.previousTime)/1000;
    this.previousTime = time;
    if( dt > 1/5 || dt < 1/180 ) {
      dt = 1/60;
    }
    if( this._checkSize() ){
      this.render( dt );
    }
    if( this._playing ) {
      this._requestFrame();
    }
  }


  render( dt:number ){
    if( this.scene )
      this.scene.render(dt);
  }




}



export default GLView;