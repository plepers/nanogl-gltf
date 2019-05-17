import GltfReader from "./GltfReader";
export default class GltfIO {
    constructor(io) {
        this._ioImpl = io;
    }
    loadGltf(path, baseurl = undefined) {
        if (baseurl === undefined)
            [baseurl, path] = this._ioImpl.resolveBaseDir(path);
        const reader = new GltfReader(this._ioImpl, path, baseurl);
        return this._ioImpl.loadBinaryResource(this._ioImpl.resolvePath(path, baseurl))
            .then(reader.parse);
    }
}
