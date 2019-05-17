import { loadText, loadBytes, baseDir } from "../lib/net";
import UTF8 from '../lib/utf8-decoder';
import GltfIO from ".";
class WebImpl {
    resolveBaseDir(path) {
        return baseDir(path);
    }
    resolvePath(path, baseurl) {
        if (baseurl !== undefined)
            return baseurl + '/' + path;
        return path;
    }
    decodeUTF8(buffer, offset = 0, length = undefined) {
        return UTF8(new Uint8Array(buffer, offset, length));
    }
    loadResource(path) {
        return loadText(path);
    }
    loadBinaryResource(path) {
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
