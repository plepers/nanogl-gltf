import Gltf from "..";
import when from 'when';
import { ElementType, MAGIC, GLB_HEADER_SIZE, JSON_MAGIC } from "../consts";
import BufferView from "../elements/BufferView";
import Accessor from "../elements/Accessor";
import Mesh from "../elements/Mesh";
import Skin from "../elements/Skin";
import Camera from "../elements/Camera";
import Material from "../elements/Material";
import Buffer from "../elements/Buffer";
import Node from "../elements/Node";
import Animation from "../elements/Animation";
export default class GltfReader {
    constructor(gltfIO, url, baseurl) {
        this.parse = (buffer) => {
            return this.unpack(buffer)
                .then(this.loadBuffers)
                .then(this.parseAll)
                .then(this.yieldGltf);
        };
        this.unpack = (buffer) => {
            const magic = new Uint32Array(buffer, 0, 1)[0];
            if (magic === MAGIC) {
                this.unpackGlb(buffer);
            }
            else {
                const jsonStr = this.gltfIO.decodeUTF8(buffer);
                this._data = JSON.parse(jsonStr);
            }
            return when(true);
        };
        this.loadBuffers = () => {
            const buffers = this.gltf._getTypeHolder(ElementType.BUFFER);
            for (var i = buffers.length; i < this._data.buffers.length; i++) {
                this.gltf.addElement(new Buffer(this.gltf, this._data.buffers[i]));
            }
            return when.map(buffers, this.loadBuffer);
        };
        this.loadBuffer = (b) => {
            if (b.uri === undefined)
                return (b._bytes);
            const uri = this.gltfIO.resolvePath(b.uri, this._baseUrl);
            return this.gltfIO.loadBinaryResource(uri)
                .then(data => b._bytes = data);
        };
        this.parseAll = () => {
            this._parseElements(ElementType.BUFFERVIEW, BufferView);
            this._parseElements(ElementType.ACCESSOR, Accessor);
            this._parseElements(ElementType.MESH, Mesh);
            this._parseElements(ElementType.NODE, Node);
            this._parseElements(ElementType.ANIMATION, Animation);
            this._parseElements(ElementType.SKIN, Skin);
            this._parseElements(ElementType.CAMERA, Camera);
            this._parseElements(ElementType.MATERIAL, Material);
            // resolve nodes refs
            const nodes = this.gltf._getTypeHolder(ElementType.NODE);
            for (var node of nodes) {
                node.resolveReferences();
            }
        };
        this.yieldGltf = () => {
            return when(this.gltf);
        };
        this.gltfIO = gltfIO;
        this._url = url;
        this._baseUrl = baseurl;
        this.gltf = new Gltf();
        this._data = null;
    }
    unpackGlb(buffer) {
        const [version, , jsonSize, magic] = new Uint32Array(buffer, 0, 5);
        // Check that the version is 2
        if (version !== 2)
            throw new Error('Binary glTF version is not 2');
        // Check that the scene format is 0, indicating that it is JSON
        if (magic !== JSON_MAGIC)
            throw new Error('Binary glTF scene format is not JSON');
        const scene = this.gltfIO.decodeUTF8(buffer, GLB_HEADER_SIZE, jsonSize);
        this._data = JSON.parse(scene);
        const mbuffer = new Buffer(this.gltf, {});
        mbuffer._bytes = buffer.slice(GLB_HEADER_SIZE + jsonSize + 8);
        this.gltf.addElement(mbuffer);
    }
    _parseElements(type, _Class) {
        if (this._data[type]) {
            this._data[type].forEach(d => this.gltf.addElement(new _Class(this.gltf, d)));
        }
    }
}
