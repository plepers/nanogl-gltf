import GLState from "nanogl-state";
import { GLContext } from "nanogl/types";
import Camera from "nanogl-camera";
import GLConfig from "nanogl-state/config";
import Bounds from "nanogl-pbr/Bounds";
import Node from "nanogl-node";


export interface IRenderingContext {
  glstate : GLState;
  gl      : GLContext;
}


export default interface IRenderable {

  readonly node: Node;
  readonly bounds : Bounds;
  render( context:IRenderingContext, camera:Camera, mask:number, passId : string, cfg?:GLConfig ) : void ;
}
