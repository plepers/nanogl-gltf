import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export default class Asset extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        this.version = data.version;
        this.copyright = data.copyright;
        this.generator = data.generator;
        this.minVersion = data.minVersion;
    }
}
Asset.TYPE = ElementType.ASSET;
