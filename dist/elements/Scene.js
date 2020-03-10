import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export default class Scene extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        if (data.nodes !== undefined) {
            this.nodes = data.nodes.map(idx => gltf.getElement(ElementType.NODE, idx));
        }
        else {
            this.nodes = [];
        }
    }
    /*
     * update world matrices of all scene nodes
     */
    updateNodes() {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].updateWorldMatrix();
        }
    }
}
Scene.TYPE = ElementType.SCENE;
