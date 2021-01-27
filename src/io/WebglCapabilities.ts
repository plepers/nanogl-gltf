import { GLContext, isWebgl2 } from "nanogl/types";

export default class WebGLCapabilities {

  readonly isWebgl2: boolean = false;

  constructor() {

    let cvs = document.createElement("canvas");
    let gl = <GLContext>(
      cvs.getContext('webgl2', {}) ||
      cvs.getContext('webgl', {}) ||
      cvs.getContext('experimental-webgl', {}) ||
      cvs.getContext('webgl'));

    this.isWebgl2 = isWebgl2(gl);

    let loseExt = gl.getExtension('WEBGL_lose_context');
    if (loseExt) {
      loseExt.loseContext();
    }

  }

}