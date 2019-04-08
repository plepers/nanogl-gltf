//@flow
import { ElementType } from '../consts';
import NGLNode from 'nanogl-node';
export default class Node extends NGLNode {
    constructor(gltf, data) {
        super(gltf, data);
        this.name = data.name;
        this.extras = data.extras;
        this.extensions = data.extensions;
        if (data.camera !== undefined)
            this.camera = this.gltf.getElement(ElementType.TYPE_CAMERA, data.camera);
        if (data.matrix)
            this.setMatrix(data.matrix);
        if (data.scale)
            this.scale.set(data.scale);
        if (data.translation)
            this.position.set(data.translation);
        if (data.rotation)
            this.rotation.set(data.rotation);
        if (data.weights)
            this.weights = data.weights;
        this.invalidate();
    }
    get elementType() {
        return this.constructor['TYPE'];
    }
    resolveReferences() {
    }
}
Node.TYPE = ElementType.TYPE_NODE;
