/// <
import * as Net from './lib/net';
import when from 'when';
import UTF8 from './lib/utf8-decoder';
import Extensions from './extensions';
import Accessor from './elements/Accessor';
import BufferView from './elements/BufferView';
import Buffer from './elements/Buffer';
import Animation from './elements/Animation';
import Node from './elements/Node';
import Material from './elements/Material';
import Mesh from './elements/Mesh';
import Skin from './elements/Skin';
import Camera from './elements/Camera';
import { ElementType } from './consts';
// import type AnimationSampler from './elements/AnimationSampler';
// import type AnimationChannel from './elements/AnimationChannel';
// import type BaseElement      from './elements/BaseElement';
// import type {ElementType}    from './consts';
const MAGIC = 0x46546C67; // "glTF"
const JSON_MAGIC = 0x4E4F534A; // "JSON"
const GLB_HEADER_SIZE = 20;
/** Gltf file representation */
export default class Gltf {
    constructor() {
        this.unpack = (buffer) => {
            const magic = new Uint32Array(buffer, 0, 1)[0];
            if (magic === MAGIC) {
                this.unpackGlb(buffer);
            }
            else {
                const jsonStr = UTF8(new Uint8Array(buffer));
                this._data = JSON.parse(jsonStr);
            }
        };
        this.loadBuffers = () => {
            const buffers = this._getTypeHolder(ElementType.TYPE_BUFFER);
            for (var i = buffers.length; i < this._data.buffers.length; i++) {
                this.addElement(new Buffer(this, this._data.buffers[i]));
            }
            return when.map(buffers, b => b.load());
        };
        this.parse = () => {
            this._parseElements(ElementType.TYPE_BUFFERVIEW, BufferView);
            this._parseElements(ElementType.TYPE_ACCESSOR, Accessor);
            this._parseElements(ElementType.TYPE_NODE, Node);
            this._parseElements(ElementType.TYPE_ANIMATION, Animation);
            this._parseElements(ElementType.TYPE_SKIN, Skin);
            this._parseElements(ElementType.TYPE_MESH, Mesh);
            this._parseElements(ElementType.TYPE_CAMERA, Camera);
            this._parseElements(ElementType.TYPE_MATERIAL, Material);
            // resolve nodes refs
        };
        this._url = null;
        this._data = null;
        this._extensions = new Extensions();
        this._byType = new Map([
            [ElementType.TYPE_BUFFER, []],
            [ElementType.TYPE_BUFFERVIEW, []],
            [ElementType.TYPE_ACCESSOR, []],
            [ElementType.TYPE_ANIMATION, []],
            [ElementType.TYPE_ANIMATION_SAMPLER, []],
            [ElementType.TYPE_ANIMATION_CHANNEL, []],
            [ElementType.TYPE_MESH, []],
            [ElementType.TYPE_PRIMITIVE, []],
            [ElementType.TYPE_NODE, []],
            [ElementType.TYPE_MATERIAL, []],
        ]);
        this._elements = [];
    }
    get accessors() {
        return this._getTypeHolder(ElementType.TYPE_ACCESSOR);
    }
    get animations() {
        return this._getTypeHolder(ElementType.TYPE_ANIMATION);
    }
    get buffers() {
        return this._getTypeHolder(ElementType.TYPE_BUFFER);
    }
    get bufferViews() {
        return this._getTypeHolder(ElementType.TYPE_BUFFERVIEW);
    }
    _getTypeHolder(type) {
        return this._byType.get(type);
    }
    getAllElements() {
        return this._elements;
    }
    addElement(element) {
        const a = this._getTypeHolder(element.elementType);
        if (a.indexOf(element) === -1) {
            a.push(element);
            this._elements.push(element);
        }
    }
    addElements(elements) {
        for (var e of elements) {
            this.addElement(e);
        }
    }
    getElement(type, index) {
        return this._getTypeHolder(type)[index];
    }
    load(url) {
        this._url = url;
        this._baseDir = Net.baseDir(url);
        return Net.loadBytes(url)
            .then(this.unpack)
            .then(this.loadBuffers)
            .then(this.parse);
    }
    unpackGlb(buffer) {
        const [version, , jsonSize, magic] = new Uint32Array(buffer, 0, 5);
        // Check that the version is 2
        if (version !== 2)
            throw new Error('Binary glTF version is not 2');
        // Check that the scene format is 0, indicating that it is JSON
        if (magic !== JSON_MAGIC)
            throw new Error('Binary glTF scene format is not JSON');
        const scene = UTF8(new Uint8Array(buffer, GLB_HEADER_SIZE, jsonSize));
        this._data = JSON.parse(scene);
        const mbuffer = new Buffer(this, {});
        mbuffer._bytes = buffer.slice(GLB_HEADER_SIZE + jsonSize + 8);
        this.addElement(mbuffer);
    }
    _parseElements(type, _Class) {
        if (this._data[type]) {
            this._data[type].forEach(d => this.addElement(new _Class(this, d)));
        }
    }
    resolveUri(uri) {
        return this._baseDir + uri;
    }
}
/// #if DEBUG
// hot reload
/// #endif
