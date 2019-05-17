//@flow
import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export default class Camera extends BaseElement {
    constructor(gltf, data) {
        super(gltf, data);
    }
}
Camera.TYPE = ElementType.CAMERA;
