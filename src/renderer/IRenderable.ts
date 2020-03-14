import GLState from "nanogl-state";
import { GLContext } from "nanogl/types";
import Camera from "nanogl-camera";
import GLConfig from "nanogl-state/config";


export interface IRenderingContext {
  glstate : GLState;
  gl      : GLContext;
}


export default interface IRenderable {
  render( context:IRenderingContext, camera:Camera, mask:number, passId : string, cfg?:GLConfig ) : void ;
}
