import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export default class Texture extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        if (data.sampler !== undefined) {
            this.sampler = gltf.getElement(ElementType.SAMPLER, data.sampler);
        }
        if (data.source !== undefined) {
            this.source = gltf.getElement(ElementType.IMAGE, data.source);
        }
    }
}
Texture.TYPE = ElementType.TEXTURE;
