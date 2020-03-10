import { ElementType } from '../consts';
import BaseElement from './BaseElement';
import PbrMetallicRoughness from './PbrMetallicRoughness';
import NormalTextureInfo from './NormalTextureInfo';
import OcclusionTextureInfo from './OcclusionTextureInfo';
import TextureInfo from './TextureInfo';
export var AlphaMode;
(function (AlphaMode) {
    AlphaMode["OPAQUE"] = "OPAQUE";
    AlphaMode["MASK"] = "MASK";
    AlphaMode["BLEND"] = "BLEND";
})(AlphaMode || (AlphaMode = {}));
export default class Material extends BaseElement {
    parse(gltf, data) {
        var _a, _b;
        super.parse(gltf, data);
        this.emissiveFactor = new Float32Array(data.emissiveFactor || [0, 0, 0]);
        this.alphaMode = data.alphaMode || AlphaMode.OPAQUE;
        this.alphaCutoff = (_a = data.alphaCutoff, (_a !== null && _a !== void 0 ? _a : 0.5));
        this.doubleSided = (_b = data.doubleSided, (_b !== null && _b !== void 0 ? _b : false));
        if (data.pbrMetallicRoughness !== undefined) {
            this.pbrMetallicRoughness = new PbrMetallicRoughness();
            this.pbrMetallicRoughness.parse(gltf, data.pbrMetallicRoughness);
        }
        if (data.normalTexture !== undefined) {
            this.normalTexture = new NormalTextureInfo();
            this.normalTexture.parse(gltf, data.normalTexture);
        }
        if (data.occlusionTexture !== undefined) {
            this.occlusionTexture = new OcclusionTextureInfo();
            this.occlusionTexture.parse(gltf, data.occlusionTexture);
        }
        if (data.emissiveTexture !== undefined) {
            this.emissiveTexture = new TextureInfo();
            this.emissiveTexture.parse(gltf, data.emissiveTexture);
        }
    }
    prepare(node, camera, primitive) {
        //TODO: material prepare 
    }
}
Material.TYPE = ElementType.MATERIAL;
