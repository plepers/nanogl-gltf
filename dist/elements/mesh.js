import { ElementType } from '../consts';
import BaseElement from './BaseElement';
import Primitive from './Primitive';
export default class Mesh extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        this.primitives = data.primitives.map(d => {
            const p = new Primitive();
            p.parse(gltf, d);
            return p;
        });
        this.gltf.addElements(this.primitives);
        if (data.weights)
            this.weights = new Float32Array(data.weights);
    }
    allocateGl(gl) {
        for (const primitive of this.primitives) {
            primitive.allocateGl(gl);
        }
    }
}
Mesh.TYPE = ElementType.MESH;
