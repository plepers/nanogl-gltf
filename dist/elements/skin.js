import { ElementType } from '../consts';
import BaseElement from './BaseElement';
import { mat4 } from 'gl-matrix';
export default class Skin extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        this.joints = data.joints.map(idx => this.gltf.getElement(ElementType.NODE, idx));
        this.inverseBindMatrices = this.joints.map(mat4.create);
        if (data.inverseBindMatrices !== undefined) {
            const ibmAccessor = this.gltf.getElement(ElementType.ACCESSOR, data.inverseBindMatrices);
            this.inverseBindMatrices.forEach((m, i) => ibmAccessor.getValue(m, i));
        }
        if (data.skeleton !== undefined) {
            this.skeletonRoot = this.gltf.getElement(ElementType.NODE, data.skeleton);
        }
    }
}
Skin.TYPE = ElementType.SKIN;
