import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export default class Image extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        this.uri = data.uri;
        this.mimeType = data.mimeType;
        if (data.bufferView !== undefined) {
            this.bufferView = gltf.getElement(ElementType.BUFFERVIEW, data.bufferView);
        }
    }
}
Image.TYPE = ElementType.IMAGE;
