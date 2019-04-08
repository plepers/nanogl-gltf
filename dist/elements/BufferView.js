//@flow
import BaseElement from './BaseElement';
import { ElementType } from '../consts';
export default class BufferView extends BaseElement {
    constructor(gltf, data) {
        super(gltf, data);
        const { byteLength, byteOffset = 0, byteStride = 0, target = 0 } = data;
        this.byteLength = byteLength;
        this.byteOffset = byteOffset;
        this.byteStride = byteStride;
        this.target = target;
        this.buffer = this.gltf.getElement(ElementType.TYPE_BUFFER, data.buffer);
    }
    getByteOffset() {
        return this.byteOffset + this.buffer._byteOffset;
    }
}
BufferView.TYPE = ElementType.TYPE_BUFFERVIEW;
