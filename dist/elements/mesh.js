//@flow
import { ElementType } from '../consts';
import BaseElement from './BaseElement';
import Primitive from './Primitive';
export default class Mesh extends BaseElement {
    constructor(gltf, data) {
        super(gltf, data);
        this.primitives = data.primitives.map(d => new Primitive(gltf, d));
        this.gltf.addElements(this.primitives);
        if (data.weights)
            this.weights = new Float32Array(data.weights);
    }
}
Mesh.TYPE = ElementType.MESH;
