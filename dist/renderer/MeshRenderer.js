export default class MeshRenderer {
    constructor(node) {
        this.node = node;
        this.mesh = node.mesh;
    }
    render(glstate, camera, mask = ~0, glconfig) {
        const primitives = this.mesh.primitives;
        for (let i = 0; i < primitives.length; i++) {
            const primitive = primitives[i];
            const mat = primitive.material;
            mat.prepare(this.node, camera, primitive);
            // push configs
            // -------------
            mat.glconfig && glstate.push(mat.glconfig);
            this.glconfig && glstate.push(this.glconfig);
            glconfig && glstate.push(glconfig);
            glstate.apply();
            // render
            // ----------
            // this.drawCall(camera, mat.prg, primitive, mat);
            // pop configs
            // -------------
            mat.glconfig && glstate.pop();
            this.glconfig && glstate.pop();
            glconfig && glstate.pop();
        }
    }
    drawCall(camera, prg, primitive, mat) {
    }
}
