import { ElementType } from '../consts';
import BaseElement from './BaseElement';
const GL_REPEAT = 10497;
export default class Sampler extends BaseElement {
    parse(gltf, data) {
        var _a, _b;
        super.parse(gltf, data);
        this.magFilter = data.magFilter;
        this.minFilter = data.minFilter;
        this.wrapS = (_a = data.wrapS, (_a !== null && _a !== void 0 ? _a : GL_REPEAT));
        this.wrapT = (_b = data.wrapT, (_b !== null && _b !== void 0 ? _b : GL_REPEAT));
    }
}
Sampler.TYPE = ElementType.SAMPLER;
