import base64 from 'base64-js';
import when from 'when';
import { loadText, loadBytes, baseDir } from "../lib/net";
import UTF8 from '../lib/utf8-decoder';
import GltfIO from ".";
class WebImpl {
    isDataURI(uri) {
        return (uri.indexOf('data:') === 0);
    }
    decodeDataURI(uri) {
        if (uri.indexOf('data:') !== 0) {
            throw new Error('invalid dataURI');
        }
        var b64 = uri.substr(uri.indexOf(',') + 1);
        return base64.toByteArray(b64).buffer;
    }
    resolveBaseDir(path) {
        return baseDir(path);
    }
    resolvePath(path, baseurl) {
        if (baseurl === undefined || this.isDataURI(path))
            return path;
        return baseurl + '/' + path;
    }
    decodeUTF8(buffer, offset = 0, length = undefined) {
        return UTF8(new Uint8Array(buffer, offset, length));
    }
    loadResource(path) {
        return loadText(path);
    }
    loadBinaryResource(path) {
        if (this.isDataURI(path)) {
            return when(this.decodeDataURI(path));
        }
        return loadBytes(path);
    }
    writeResource(path, data) {
        throw new Error("Method not implemented.");
    }
    writeBinaryResource(path, data) {
        throw new Error("Method not implemented.");
    }
}
const _instance = new GltfIO(new WebImpl());
export default _instance;
