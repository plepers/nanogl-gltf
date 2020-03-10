export var ArrayBufferType;
(function (ArrayBufferType) {
    ArrayBufferType[ArrayBufferType["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
    ArrayBufferType[ArrayBufferType["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
})(ArrayBufferType || (ArrayBufferType = {}));
export default class BufferCache {
    // private _ibuffers : Record<number, WebGLBuffer> 
    constructor(gl) {
        this.gl = gl;
        this._buffers = {};
        // this._abuffers = {};
    }
    getBuffer(bufferView, target) {
        // const dict = (target == ArrayBufferType.ARRAY_BUFFER) ? this._abuffers : this._ibuffers;
        const uid = bufferView.uid;
        let glBuffer = this._buffers[uid];
        if (glBuffer === undefined) {
            const gl = this.gl;
            const data = new Uint8Array(bufferView.buffer._bytes, bufferView.getByteOffset(), bufferView.byteLength);
            glBuffer = gl.createBuffer();
            gl.bindBuffer(target, glBuffer);
            gl.bufferData(target, data, gl.STATIC_DRAW);
            gl.bindBuffer(target, null);
            this._buffers[uid] = glBuffer;
        }
        return glBuffer;
    }
}
