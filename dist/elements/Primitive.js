import { ElementType, PrimitiveMode } from '../consts';
import BaseElement from './BaseElement';
import GLArrayBuffer from 'nanogl/arraybuffer';
import Vao from 'nanogl-vao';
import GLIndexBuffer from 'nanogl/indexbuffer';
class Attribute {
    constructor(semantic, accessor) {
        this.semantic = semantic;
        this.accessor = accessor;
    }
}
class BufferInfos {
    constructor(accessor) {
        this.accessor = accessor;
        this.attributes = [];
    }
    addAttribute(attribute) {
        this.attributes.push(attribute);
    }
}
class AttributesSet {
    constructor() {
        this._attributes = [];
    }
    get length() {
        return this._attributes.length;
    }
    add(attribute) {
        this._attributes.push(attribute);
    }
    getSemantic(semantic) {
        for (var a of this._attributes) {
            if (a.semantic === semantic)
                return a;
        }
        return null;
    }
    /*
     * return set of attributes group by bufferView
     */
    getBuffersViewSets() {
        const map = new Map();
        for (var a of this._attributes) {
            var bId = a.accessor.bufferView.uid;
            if (!map.has(bId)) {
                map.set(bId, new BufferInfos(a.accessor));
            }
            map.get(bId).addAttribute(a);
        }
        return Array.from(map.values());
    }
}
export default class Primitive extends BaseElement {
    constructor() {
        super(...arguments);
        this.material = null;
        this.indices = null;
        this.targets = null;
    }
    parse(gltf, data) {
        super.parse(gltf, data);
        this.attributes = new AttributesSet();
        this.parseAttributeSet(this.attributes, data.attributes);
        if (data.indices !== undefined)
            this.indices = gltf.getElement(ElementType.ACCESSOR, data.indices);
        if (data.material !== undefined)
            this.material = gltf.getElement(ElementType.MATERIAL, data.material);
        if (data.mode !== undefined)
            this.mode = data.mode;
        else
            this.mode = PrimitiveMode.DEFAULT;
        if (data.targets !== undefined) {
            this.targets = [];
            for (var tgt of data.targets) {
                const aset = new AttributesSet();
                this.parseAttributeSet(aset, tgt);
                this.targets.push(aset);
            }
        }
    }
    parseAttributeSet(aset, data) {
        for (const attrib in data) {
            const accessor = this.gltf.getElement(ElementType.ACCESSOR, data[attrib]);
            aset.add(new Attribute(attrib, accessor));
        }
    }
    allocateGl(gl) {
        this._vaoMap = new Map();
        this.buffers = [];
        const buffersSet = this.attributes.getBuffersViewSets();
        for (const set of buffersSet) {
            this.buffers.push(this.createArrayBuffer(gl, set));
        }
        if (this.indices !== null) {
            const glBuffer = this.gltf.bufferCache.getBuffer(this.indices.bufferView, 34963 /* ELEMENT_ARRAY_BUFFER */);
            this.indexBuffer = new GLIndexBuffer(gl, this.indices.componentType, undefined, gl.STATIC_DRAW, glBuffer);
        }
    }
    createArrayBuffer(gl, set) {
        const bufferView = set.accessor.bufferView;
        const glBuffer = this.gltf.bufferCache.getBuffer(bufferView, 34962 /* ARRAY_BUFFER */);
        const glArraybuffer = new GLArrayBuffer(gl, undefined, gl.STATIC_DRAW, glBuffer);
        glArraybuffer.byteLength = bufferView.byteLength;
        glArraybuffer.stride = 0;
        for (const attribute of set.attributes) {
            const def = this.createAttributeDefinition(attribute);
            glArraybuffer.attribs.push(def);
        }
        return glArraybuffer;
    }
    createAttributeDefinition(attribute) {
        const accessor = attribute.accessor;
        return {
            name: this.gltf.semantics.getAttributeName(attribute.semantic),
            type: accessor.componentType,
            size: accessor.numComps,
            normalize: accessor.normalized,
            offset: accessor.byteOffset,
            stride: accessor._stride
        };
    }
    getVao(prg) {
        const id = prg._cuid.toString();
        if (!this._vaoMap.has(id)) {
            const vao = new Vao(prg.gl);
            vao.setup(prg, this.buffers, this.indexBuffer);
            this._vaoMap.set(id, vao);
        }
        return this._vaoMap.get(id);
    }
    bindVao(prg) {
        this._currentVao = this.getVao(prg);
        this._currentVao.bind();
    }
    render() {
        if (this.indexBuffer)
            this.indexBuffer.draw(this.mode);
        else
            this.buffers[0].draw(this.mode);
    }
    unbindVao() {
        this._currentVao.unbind();
    }
}
Primitive.TYPE = ElementType.PRIMITIVE;
