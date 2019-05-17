//@flow
import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export default class Buffer extends BaseElement {
    constructor(gltf, data) {
        super(gltf, data);
        this.byteLength = data.byteLength;
        this.uri = data.uri;
        this._bytes = null;
        this._byteOffset = 0;
    }
}
Buffer.TYPE = ElementType.BUFFER;
