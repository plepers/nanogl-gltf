import ElementImpl from "./ElementImpl";
export class MeshRenderable extends ElementImpl {
    constructor(gltfMesh) {
        super(gltfMesh);
    }
    render(glstate, camera, mask, cfg) {
        for (var prim of this.primitives) {
            var mat = prim.material;
            if ((mat._mask & mask) === 0) {
                continue;
            }
        }
    }
}
