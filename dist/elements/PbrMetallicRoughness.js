import { ElementType } from '../consts';
import TextureInfo from './TextureInfo';
import BaseElement from './BaseElement';
export default class PbrMetallicRoughness extends BaseElement {
    parse(gltf, data) {
        var _a, _b;
        super.parse(gltf, data);
        this.baseColorFactor = new Float32Array(data.baseColorFactor || [1, 1, 1, 1]);
        this.metallicFactor = (_a = data.metallicFactor, (_a !== null && _a !== void 0 ? _a : 1));
        this.roughnessFactor = (_b = data.roughnessFactor, (_b !== null && _b !== void 0 ? _b : 1));
        if (data.baseColorTexture !== undefined) {
            this.baseColorTexture = new TextureInfo();
            this.baseColorTexture.parse(gltf, data.baseColorTexture);
        }
        if (data.metallicRoughnessTexture !== undefined) {
            this.metallicRoughnessTexture = new TextureInfo();
            this.metallicRoughnessTexture.parse(gltf, data.metallicRoughnessTexture);
        }
    }
}
PbrMetallicRoughness.TYPE = ElementType.PBR_METALLIC_ROUGHNESS;
