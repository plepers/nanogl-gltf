
import Signal from './signal'
import { vec2 } from 'gl-matrix';

const V2 = vec2.create()


function normalizeButtons( e ){

  if ( e.buttons === undefined ) 
    return 1 << e.which
  return e.buttons;

}



export class InputTouch {


  id: number;
  onEnd: Signal;
  startCoords: vec2;
  coords : vec2;
  ncoords: vec2;
  pcoords: vec2;

  nativeTouch : Touch

  startTime : number;

  get duration():number{
    return Date.now() - this.startTime;
  }


  constructor( ntouch : Touch ){
    this.nativeTouch = ntouch;
    this.id = ntouch.identifier;
    this.startTime = Date.now();
    this.onEnd = new Signal();

    this.startCoords = vec2.create();
    this.coords      = vec2.create();
    this.ncoords     = vec2.create();
    this.pcoords     = vec2.create();

    this.update( ntouch )
    this.startCoords.set( this.coords );
  }


  getDelta( out ){
    out[0] = this.coords[0] - this.startCoords[0];
    out[1] = this.coords[1] - this.startCoords[1];
  }

  getDeltaLength():number{
    this.getDelta(V2);
    return vec2.length( V2 );
  }


  update( ntouch ){

    const cx = ntouch.clientX;
    const cy = ntouch.clientY;

    this.pcoords[0] = cx
    this.pcoords[1] = cy;

    this.coords[0]  =   2 * cx /  (window.innerWidth) - 1;
    this.coords[1]  = -(2 * cy /  (window.innerHeight) - 1);

    this.ncoords[0] =   2 * cx / (window.innerWidth) - 1;
    this.ncoords[1] = -(2 * cy / (window.innerWidth) - 1);

  }


  end(){
    this.onEnd.emit();
    this.onEnd.release();
  }


}



export default class Inputs {
  el: Node;
  
  touches: InputTouch[];
  touchesById: Record<string, InputTouch>;
  
  onTouchAdded: Signal<InputTouch>;
  onTouchRemoved: Signal<InputTouch>;

  _handleMouse: boolean;

  constructor( el : Node ){
    this.el = el;

    this.touches     = [];
    this.touchesById = {};


    this.onTouchAdded   = new Signal();
    this.onTouchRemoved = new Signal();

    this._handleMouse = true;

    if( el !== undefined ) {

      const _detectTouch = e=>{
        this._handleMouse = false;
        el.removeEventListener( 'touchstart', _detectTouch );
      }
      el.addEventListener( 'touchstart', _detectTouch );
      
    }
  }





  start( el?:Node ){
    if( el !== undefined ){
      this.el = el;

      const _detectTouch = e=>{
        this._handleMouse = false;
        el.removeEventListener( 'touchstart', _detectTouch );
      }
      el.addEventListener( 'touchstart', _detectTouch );
    }


    const bd = document.body;
    el = this.el;
    
    el.addEventListener( 'mousemove' , this.mousehandler );
    el.addEventListener( 'mousedown' , this.mousehandler );
    bd.addEventListener( 'mouseleave', this.mouseend );
    bd.addEventListener( 'mouseup'   , this.mouseend );
    
    el.addEventListener( 'touchmove' , this.touchmove  );
    el.addEventListener( 'touchstart', this.touchstart );
    bd.addEventListener( 'touchend'  , this.touchend   );
    
  }

  
  
  release(){
    var el = this.el;
    const bd = document.body;

    this.removeAllTouch();
   
    el.removeEventListener( 'mousemove' , this.mousehandler );
    el.removeEventListener( 'mousedown' , this.mousehandler );
    bd.removeEventListener( 'mouseleave', this.mouseend );
    bd.removeEventListener( 'mouseup'   , this.mouseend );

    el.removeEventListener( 'touchmove',  this.touchmove  );
    el.removeEventListener( 'touchstart', this.touchstart );
    bd.removeEventListener( 'touchend',   this.touchend   );

  }


  addTouch( ntouch ){
    var touch = new InputTouch( ntouch );
    
    this.touches.push( touch );
    this.touchesById[touch.id] = touch;
    this.onTouchAdded.emit( touch );
  }


  removeTouch(ntouch){
    this.removeTouchId( ntouch.identifier );
  }

  removeTouchId(id){
    var touch = this.touchesById[id];
    if( touch !== undefined ){
      this.touches.splice( this.touches.indexOf( touch ), 1 );
      delete this.touchesById[touch.id];
      touch.end();
      this.onTouchRemoved.emit( touch );
    }
  }

  removeAllTouch(){
    for (var i = 0; i < this.touches.length; i++) {
      this.touches[i].end();
      this.onTouchRemoved.emit( this.touches[i] );
    }
    this.touches = [];
    this.touchesById = {};

  }



  touchstart = ( e:TouchEvent )=>{

    for (var i = 0; i < e.changedTouches.length; i++) {
      this.addTouch( e.changedTouches[i] );
    }

  }

  touchmove = ( e:TouchEvent )=>{

    if( e.touches.length < this.touches.length ){
      var a = Array.from( e.touches ).map( nt=>nt.identifier );
      for (var i = this.touches.length-1; i>-1; i-- ) {
        var t = this.touches[i];
        if( a.indexOf( t.id ) === -1 ) this.removeTouchId( t.id );
      }
    }

    var tl = e.changedTouches;
    for (var i = 0; i < tl.length; i++) {
      this.touchesById[ tl[i].identifier ].update( tl[i] );
    }    
      
  }

  touchend= ( e:TouchEvent )=>{

    for (var i = 0; i < e.changedTouches.length; i++) {
      this.removeTouch( e.changedTouches[i] );
    }    

  }


  mousehandler=( e )=>{

    if( !this._handleMouse ) return;
    
    const buttons = normalizeButtons( e );

    if( (buttons & 1) === 0 ) return;
    

    mtouch.clientX = e.clientX;
    mtouch.clientY = e.clientY;

    if( this.touchesById['mouse0'] === undefined ){
      this.touchstart( _mouse_evt );
    } else {
      this.touchmove ( _mouse_evt );
    }

    // console.log( e.type )
    // switch( e.type ){
    //   case 'mousedown' : this._touchstart( _mouse_evt ); break;
    //   case 'mousemove' : this._touchmove ( _mouse_evt ); break;
    // }

  }

  mouseend=( e )=>{
    if( !this._handleMouse ) return;
    this.touchend  ( _mouse_evt );
  }



}


// emulated touch event for mouse
// ------------------

var mtouch = {
  identifier : 'mouse0',
  clientX : 0,
  clientY : 0
};

var _mouse_evt : TouchEvent = {
  changedTouches : [mtouch],
  touches : [mtouch],
} as any as TouchEvent;
