//@flow
import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export default class Skin extends BaseElement {
    constructor(gltf, data) {
        super(gltf, data);
    }
}
Skin.TYPE = ElementType.TYPE_SKIN;
