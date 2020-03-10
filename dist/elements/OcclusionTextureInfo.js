import { ElementType } from '../consts';
import TextureInfo from './TextureInfo';
export default class OcclusionTextureInfo extends TextureInfo {
    parse(gltf, data) {
        var _a;
        super.parse(gltf, data);
        this.strength = (_a = data.strength, (_a !== null && _a !== void 0 ? _a : 1));
    }
}
OcclusionTextureInfo.TYPE = ElementType.OCCLUSION_TEXTURE_INFO;
