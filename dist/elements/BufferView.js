import BaseElement from './BaseElement';
import { ElementType } from '../consts';
export default class BufferView extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        const { byteLength, byteOffset = 0, byteStride = 0, target = 0 } = data;
        this.byteLength = byteLength;
        this.byteOffset = byteOffset;
        this.byteStride = byteStride;
        this.target = target;
        this.buffer = this.gltf.getElement(ElementType.BUFFER, data.buffer);
    }
    getByteOffset() {
        return this.byteOffset + this.buffer._byteOffset;
    }
    allocateGl(gl) {
    }
}
BufferView.TYPE = ElementType.BUFFERVIEW;
