import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export default class Buffer extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        this.byteLength = data.byteLength;
        this.uri = data.uri;
        this._bytes = null;
        this._byteOffset = 0;
    }
}
Buffer.TYPE = ElementType.BUFFER;
