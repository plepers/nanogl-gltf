import Scene from "./Scene";
import Camera from "nanogl-camera";



export interface ICameraController {

    start( camera : Camera ):void;
    stop():void;
    update( dt : number ):void;

}


export default class CameraControler {
  
  scene: Scene;
  _current: ICameraController;


  constructor( scene : Scene ){
    this.scene = scene;
    this._current = null;
  }


  setControler( ctrl:ICameraController ){
    if( this._current ){
      this._current.stop()
    }
    this._current = ctrl;
    ctrl.start( this.scene.freecamera );
  }


  preRender (){
    if( this._current ){
      this._current.update( this.scene.dt );
    }
  }

}
