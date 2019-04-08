//@flow
import { ElementType } from '../consts';
import BaseElement from './BaseElement';
class Attribute {
    constructor(semantic, accessor) {
        this.semantic = semantic;
        this.accessor = accessor;
    }
}
export default class Primitive extends BaseElement {
    constructor(gltf, data) {
        super(gltf, data);
        if (data.material)
            this.material = this.gltf.getElement(ElementType.TYPE_MATERIAL, data.material);
        this.attributes = [];
        for (const attrib in data.attributes) {
            const accessor = this.gltf.getElement(ElementType.TYPE_ACCESSOR, data.attributes[attrib]);
            this.attributes.push(new Attribute(attrib, accessor));
        }
    }
}
Primitive.TYPE = ElementType.TYPE_PRIMITIVE;
