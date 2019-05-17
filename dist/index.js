/// <
import Extensions from './extensions';
import { ElementType } from './consts';
/** Gltf file representation */
export default class Gltf {
    constructor() {
        this._url = null;
        this._data = null;
        this._extensions = new Extensions();
        this._byType = new Map([
            [ElementType.BUFFER, []],
            [ElementType.BUFFERVIEW, []],
            [ElementType.ACCESSOR, []],
            [ElementType.ANIMATION, []],
            [ElementType.ANIMATION_SAMPLER, []],
            [ElementType.ANIMATION_CHANNEL, []],
            [ElementType.MESH, []],
            [ElementType.PRIMITIVE, []],
            [ElementType.NODE, []],
            [ElementType.MATERIAL, []],
        ]);
        this._elements = [];
    }
    get accessors() {
        return this._getTypeHolder(ElementType.ACCESSOR);
    }
    get animations() {
        return this._getTypeHolder(ElementType.ANIMATION);
    }
    get buffers() {
        return this._getTypeHolder(ElementType.BUFFER);
    }
    get bufferViews() {
        return this._getTypeHolder(ElementType.BUFFERVIEW);
    }
    _getTypeHolder(type) {
        return this._byType.get(type);
    }
    getAllElements() {
        return this._elements;
    }
    addElement(element) {
        const a = this._getTypeHolder(element.elementType);
        if (a.indexOf(element) === -1) {
            a.push(element);
            this._elements.push(element);
        }
    }
    addElements(elements) {
        for (var e of elements) {
            this.addElement(e);
        }
    }
    getElement(type, index) {
        return this._getTypeHolder(type)[index];
    }
    getElementByName(type, name) {
        const list = this._getTypeHolder(type);
        for (var el of list) {
            if (el.name === name)
                return el;
        }
        return null;
    }
}
