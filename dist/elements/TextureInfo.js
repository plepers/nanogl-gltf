import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export default class TextureInfo extends BaseElement {
    parse(gltf, data) {
        var _a;
        super.parse(gltf, data);
        this.texture = gltf.getElement(ElementType.TEXTURE, data.index);
        this.texCoord = (_a = data.texCoord, (_a !== null && _a !== void 0 ? _a : 0));
    }
}
TextureInfo.TYPE = ElementType.TEXTURE_INFO;
