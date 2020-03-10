import Gltf from "..";
import when from 'when';
import { ElementType, MAGIC, GLB_HEADER_SIZE, JSON_MAGIC, ROOT_TYPES } from "../consts";
import Buffer from "../elements/Buffer";
import ElementFactory from "./ElementFactory";
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
                var buffer = new Buffer();
                buffer.parse(this.gltf, this._data.buffers[i]);
                this.gltf.addElement(buffer);
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
            var _a;
            const gltf = this.gltf;
            gltf.asset = this._factory.createElement(ElementType.ASSET);
            gltf.asset.parse(gltf, this._data.asset);
            const elementDataPair = [];
            for (let type of ROOT_TYPES) {
                (_a = this._data[type]) === null || _a === void 0 ? void 0 : _a.forEach((data) => {
                    const element = this._factory.createElement(type);
                    if (element !== null) {
                        elementDataPair.push([element, data]);
                        gltf.addElement(element);
                    }
                });
            }
            elementDataPair.forEach(([element, data]) => element.parse(gltf, data));
        };
        this.yieldGltf = () => {
            return when(this.gltf);
        };
        this.gltfIO = gltfIO;
        this._url = url;
        this._baseUrl = baseurl;
        this.gltf = new Gltf();
        this._data = null;
        this._defaultFactory = new ElementFactory();
        this._factory = this._defaultFactory;
    }
    unpackGlb(buffer) {
        const [, version, , jsonSize, magic] = new Uint32Array(buffer, 0, 5);
        // Check that the version is 2
        if (version !== 2)
            throw new Error('Binary glTF version is not 2');
        // Check that the scene format is 0, indicating that it is JSON
        if (magic !== JSON_MAGIC)
            throw new Error('Binary glTF scene format is not JSON');
        const scene = this.gltfIO.decodeUTF8(buffer, GLB_HEADER_SIZE, jsonSize);
        this._data = JSON.parse(scene);
        const bbytes = buffer.slice(GLB_HEADER_SIZE + jsonSize + 8);
        const mbuffer = new Buffer();
        mbuffer.parse(this.gltf, { byteLength: bbytes.byteLength });
        mbuffer._bytes = bbytes;
        this.gltf.addElement(mbuffer);
    }
}
