//@flow
import { ElementType } from '../consts';
import BaseElement from './BaseElement';
import NGLNode from 'nanogl-node';
export default class Node extends NGLNode {
    constructor(gltf, data) {
        super();
        this.uid = BaseElement.CreateUID();
        this.gltf = gltf;
        this.name = data.name;
        this.extras = data.extras;
        this.extensions = data.extensions;
        this.childRefs = data.children || [];
        this.skinRef = data.skin;
        if (data.camera !== undefined)
            this.camera = this.gltf.getElement(ElementType.CAMERA, data.camera);
        if (data.matrix !== undefined)
            this.setMatrix(data.matrix);
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
        this.invalidate();
    }
    get elementType() {
        return this.constructor['TYPE'];
    }
    // set weights( weights ){
    //   this.mesh.weights.set( weights );
    // }
    // get weights( ){
    //   return this.mesh.weights;
    // }
    resolveReferences() {
        for (var i of this.childRefs) {
            this.add(this.gltf.getElement(ElementType.NODE, i));
        }
        if (this.skinRef !== undefined)
            this.skin = this.gltf.getElement(ElementType.SKIN, this.skinRef);
    }
}
Node.TYPE = ElementType.NODE;
