import { ElementType } from '../consts';
import TextureInfo from './TextureInfo';
export default class NormalTextureInfo extends TextureInfo {
    parse(gltf, data) {
        var _a;
        super.parse(gltf, data);
        this.scale = (_a = data.scale, (_a !== null && _a !== void 0 ? _a : 1.0));
    }
}
NormalTextureInfo.TYPE = ElementType.NORMAL_TEXTURE_INFO;
