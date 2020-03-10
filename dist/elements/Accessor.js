import BaseElement from './BaseElement';
import { ElementType } from '../consts';
import Assert from '../lib/assert';
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["BYTE"] = 5120] = "BYTE";
    ComponentType[ComponentType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    ComponentType[ComponentType["SHORT"] = 5122] = "SHORT";
    ComponentType[ComponentType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    ComponentType[ComponentType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
    ComponentType[ComponentType["FLOAT"] = 5126] = "FLOAT";
})(ComponentType || (ComponentType = {}));
const TYPE_SIZE_MAP = {
    'SCALAR': 1,
    'VEC2': 2,
    'VEC3': 3,
    'VEC4': 4,
    'MAT2': 4,
    'MAT3': 9,
    'MAT4': 16
};
const ARRAY_TYPES = new Map([
    [5120 /* BYTE */, Int8Array],
    [5121 /* UNSIGNED_BYTE */, Uint8Array],
    [5122 /* SHORT */, Int16Array],
    [5123 /* UNSIGNED_SHORT */, Uint16Array],
    [5125 /* UNSIGNED_INT */, Uint32Array],
    [5126 /* FLOAT */, Float32Array],
]);
//https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md_animations
const NORMALIZE_FUNCS = new Map([
    [5120 /* BYTE */, c => Math.max(c / 127.0, -1.0)],
    [5121 /* UNSIGNED_BYTE */, c => c / 255.0],
    [5122 /* SHORT */, c => Math.max(c / 32767.0, -1.0)],
    [5123 /* UNSIGNED_SHORT */, c => c / 65535.0],
    [5125 /* UNSIGNED_INT */, c => c],
    [5126 /* FLOAT */, c => c],
]);
function getNormalizeFunction(t) {
    const a = NORMALIZE_FUNCS.get(t);
    Assert.isDefined(a);
    return a;
}
function getArrayForDataType(t) {
    const a = ARRAY_TYPES.get(t);
    Assert.isDefined(a);
    return a;
}
function getBytesLengthForDataType(t) {
    return getArrayForDataType(t).BYTES_PER_ELEMENT;
}
function getSizeForComponentType(t) {
    const a = TYPE_SIZE_MAP[t];
    Assert.isDefined(a);
    return a;
}
class Sparse {
    constructor(accessor, data) {
        this.accessor = accessor;
        let iData = data.indices;
        this.indices = new Accessor();
        this.indices.parse(accessor.gltf, {
            bufferView: iData.bufferView,
            byteOffset: iData.byteOffset,
            componentType: iData.componentType,
            count: data.count,
            normalized: accessor.normalized,
            type: "SCALAR"
        });
        let vData = data.values;
        this.values = new Accessor();
        this.values.parse(accessor.gltf, {
            bufferView: vData.bufferView,
            byteOffset: vData.byteOffset,
            count: data.count,
            componentType: accessor.componentType,
            normalized: accessor.normalized,
            type: accessor.type
        });
        const iset = this.indicesSet = new Set();
        const imap = this.indicesMap = new Map();
        const indices = this.indices;
        const count = indices.count;
        for (var i = 0; i < count; i++) {
            var j = indices.getScalar(i);
            iset.add(j);
            imap.set(j, i);
        }
    }
    getRawValue(out, index) {
        const isSparse = this.indicesSet.has(index);
        if (isSparse) {
            this.values.getRawValue(out, this.indicesMap.get(index));
        }
        else {
            this.accessor.getRawValue(out, index);
        }
    }
    getRawScalar(index) {
        const isSparse = this.indicesSet.has(index);
        if (isSparse) {
            return this.values.getRawScalar(this.indicesMap.get(index));
        }
        else {
            return this.accessor.getRawScalar(index);
        }
    }
}
export default class Accessor extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        const { byteOffset = 0, normalized = false, } = data;
        this.normalized = normalized;
        this.byteOffset = byteOffset;
        this.componentType = data.componentType;
        this.count = data.count;
        this.type = data.type;
        this.max = data.max;
        this.min = data.min;
        if (data.bufferView !== undefined) {
            this.bufferView = this.gltf.getElement(ElementType.BUFFERVIEW, data.bufferView);
            const Arr = getArrayForDataType(this.componentType);
            if (this.bufferView.byteStride === 0) {
                this._stride = this.numComps * this.bytesPerElem;
                this._strideElem = this.numComps;
            }
            else {
                this._stride = this.bufferView.byteStride;
                this._strideElem = this._stride / Arr.BYTES_PER_ELEMENT;
                Assert.isTrue(this._strideElem === Math.round(this._strideElem));
            }
            this._array = new Arr(this.bufferView.buffer._bytes, this.byteOffset + this.bufferView.getByteOffset(), this.count * this._strideElem);
        }
        else {
            this.bufferView = null;
            this._stride = 0;
            this._strideElem = 0;
            this._array = this.createElementHolder();
        }
        this.sparse = null;
        if (data.sparse !== undefined) {
            this.sparse = new Sparse(this, data.sparse);
        }
        this._valueHolder = this.createElementHolder();
        this._normalizeFunc = getNormalizeFunction(this.componentType);
    }
    get numComps() {
        return getSizeForComponentType(this.type);
    }
    get bytesPerElem() {
        return getBytesLengthForDataType(this.componentType);
    }
    *[Symbol.iterator]() {
        const holder = this.createElementHolder();
        for (let i = 0; i < this.count; i++) {
            this.getValue(holder, i);
            yield holder;
        }
    }
    /**
     * @return {TypedArray}
     */
    createElementHolder(normalized = this.normalized) {
        if (normalized)
            return new Float32Array(this.numComps);
        else
            return new (getArrayForDataType(this.componentType))(this.numComps);
    }
    /**
     * Copy accessor value at the given index to output array
     * @param {number} index
     * @param {boolean} normalized
     */
    getScalar(index, normalized = this.normalized) {
        let s;
        if (this.sparse !== null) {
            s = this.sparse.getRawScalar(index);
        }
        else {
            s = this.getRawScalar(index);
        }
        if (normalized) {
            s = this._normalizeFunc(s);
        }
        return s;
    }
    /**
     * Copy accessor value at the given index to output array. Skip sparse resolve
     * @param {number} index
     */
    getRawScalar(index) {
        const offset = this._strideElem * index;
        return this._array[offset];
    }
    /**
     * Copy accessor value at the given index to output array
     * @param {TypedArray} out output value
     * @param {number} index
     * @param {boolean} normalized
     */
    getValue(out, index, normalized = this.normalized) {
        const _out = normalized ? this._valueHolder : out;
        if (this.sparse !== null) {
            this.sparse.getRawValue(_out, index);
        }
        else {
            this.getRawValue(_out, index);
        }
        if (normalized) {
            this._normalize(out, _out);
        }
    }
    getRawValue(out, index) {
        const offset = this._strideElem * index;
        const ncomps = this.numComps;
        for (var i = 0; i < ncomps; i++) {
            out[i] = this._array[i + offset];
        }
    }
    _normalize(out, raw) {
        const fn = this._normalizeFunc;
        const ncomps = this.numComps;
        for (var i = 0; i < ncomps; i++) {
            out[i] = fn(raw[i]);
        }
    }
}
Accessor.TYPE = ElementType.ACCESSOR;
