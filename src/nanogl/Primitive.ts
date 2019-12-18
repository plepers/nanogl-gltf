
import   Material        from "./Material"        ;
import { GLContext     } from "nanogl/types"      ;
import   GLArrayBuffer   from "nanogl/arraybuffer"
import   Vao             from "nanogl-vao"        ;
import   IndexBuffer     from "nanogl/indexbuffer"
import   Bounds          from "./Bounds"          ;
import   Program         from "nanogl/program"    ;

// export default class Primitive {

//   material: Material;

// }


export default class Primitive {
  
  readonly gl: GLContext;
  
  material: Material;
  
  buffers: GLArrayBuffer[]
  ibuffer: IndexBuffer
  _vaoMap: Map<string, Vao>;
  bounds: Bounds;

  vertices: ArrayLike<number>[];
  indices: ArrayLike<number>;
  currentVao: Vao;

  /**
   * 
   * @param {WebGLRenderingContext} gl 
   */
  constructor(gl: GLContext) {

    this.gl = gl;

    this._vaoMap = new Map();

    this.buffers = [];
    this.ibuffer = null;

    this.bounds = new Bounds();

  }


  getVao(prg: Program) {
    const id = prg._cuid.toString();

    if (!this._vaoMap.has(id)) {
      const vao = new Vao(this.gl);
      vao.setup(prg, this.buffers, this.ibuffer);
      this._vaoMap.set(id, vao);
    }

    return this._vaoMap.get(id);
  }


  setup(prg: Program) {
    this.currentVao = this.getVao(prg)
    this.currentVao.bind();
  }


  render() {
    this.ibuffer.drawTriangles();
  }


  unbind() {
    this.currentVao.unbind()
  }

};