import { GLContext } from "nanogl/types";



export function destroyContext(gl: GLContext) {
  gl.canvas.width = 1;
  gl.canvas.height = 1;
  (gl.canvas as HTMLCanvasElement).remove();

  const ext = gl.getExtension('WEBGL_lose_context');
  if (ext) {
    ext.loseContext();
  }
}


export function createContext(ctx_attributes: WebGLContextAttributes = {}, version = 1) : GLContext {

  const opt_canvas = document.createElement("canvas");

  let name : "webgl2" | "webgl";
  switch (version) {
    case 2:
      name = "webgl2"
    default:
      name = "webgl"
  }

  const context : GLContext = opt_canvas.getContext(name, ctx_attributes);
  if (!context) {
    throw ("Unable to fetch WebGL rendering context for Canvas");
  }

  return context;

};