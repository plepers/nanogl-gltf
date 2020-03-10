import { ElementType } from '../consts';
import BaseElement, { ElementMixin } from './BaseElement';
import NGLNode from 'nanogl-node';
export default class Node extends ElementMixin(NGLNode) {
    parse(gltf, data) {
        // super.parse();
        this.uid = BaseElement.CreateUID();
        this.gltf = gltf;
        this.name = data.name;
        this.extras = data.extras;
        this.extensions = data.extensions;
        if (data.camera !== undefined)
            this.camera = this.gltf.getElement(ElementType.CAMERA, data.camera);
        if (data.matrix !== undefined)
            this.setMatrix(new Float32Array(data.matrix));
        if (data.scale !== undefined)
            this.scale.set(data.scale);
        if (data.translation !== undefined)
            this.position.set(data.translation);
        if (data.rotation !== undefined)
            this.rotation.set(data.rotation);
        if (data.weights !== undefined)
            this.weights = new Float32Array(data.weights);
        if (data.mesh !== undefined)
            this.mesh = gltf.getElement(ElementType.MESH, data.mesh);
        if (data.children !== undefined) {
            for (var i of data.children) {
                this.add(this.gltf.getElement(ElementType.NODE, i));
            }
        }
        if (data.skin !== undefined) {
            this.skin = this.gltf.getElement(ElementType.SKIN, data.skin);
        }
        this.invalidate();
    }
    get elementType() {
        return this.constructor['TYPE'];
    }
}
Node.TYPE = ElementType.NODE;
