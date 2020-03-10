import Vao from "nanogl-vao";
import Bounds from "./Bounds";
// export default class Primitive {
//   material: Material;
// }
export default class Primitive {
    /**
     *
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl) {
        this.gl = gl;
        this._vaoMap = new Map();
        this.buffers = [];
        this.ibuffer = null;
        this.bounds = new Bounds();
    }
    getVao(prg) {
        const id = prg._cuid.toString();
        if (!this._vaoMap.has(id)) {
            const vao = new Vao(this.gl);
            vao.setup(prg, this.buffers, this.ibuffer);
            this._vaoMap.set(id, vao);
        }
        return this._vaoMap.get(id);
    }
    setup(prg) {
        this.currentVao = this.getVao(prg);
        this.currentVao.bind();
    }
    render() {
        this.ibuffer.drawTriangles();
    }
    unbind() {
        this.currentVao.unbind();
    }
}
;
