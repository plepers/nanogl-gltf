//@ts-check
import Assert from './lib/assert';
class Extensions {
    constructor() {
        this._list = {};
    }
    addExtension(id, ext) {
        Assert.isUndefined(this._list[id], `extension '${id}' already exist`);
        this._list[id] = ext;
    }
    processElement(e) {
        // TODO:
    }
}
export default Extensions;
