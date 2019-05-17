//@flow
import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export default class Material extends BaseElement {
    constructor(gltf, data) {
        super(gltf, data);
    }
}
Material.TYPE = ElementType.MATERIAL;
