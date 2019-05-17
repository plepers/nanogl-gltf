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
        this.attributes = [];
        for (const attrib in data.attributes) {
            const accessor = this.gltf.getElement(ElementType.ACCESSOR, data.attributes[attrib]);
            this.attributes.push(new Attribute(attrib, accessor));
        }
        if (data.indices !== undefined)
            this.indices = this.gltf.getElement(ElementType.ACCESSOR, data.indices);
        if (data.material)
            this.material = this.gltf.getElement(ElementType.MATERIAL, data.material);
    }
}
Primitive.TYPE = ElementType.PRIMITIVE;
