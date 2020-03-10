/// <
import Extensions from './extensions';
import { ElementType } from './consts';
import BufferCache from './BufferCache';
import { DefaultSemantics } from './Semantics';
/** Gltf file representation */
export default class Gltf {
    constructor() {
        this._url = null;
        this._extensions = new Extensions();
        this._byType = new Map([
            [ElementType.BUFFER, []],
            [ElementType.BUFFERVIEW, []],
            [ElementType.ASSET, []],
            [ElementType.ACCESSOR, []],
            [ElementType.ANIMATION, []],
            [ElementType.ANIMATION_SAMPLER, []],
            [ElementType.ANIMATION_CHANNEL, []],
            [ElementType.MESH, []],
            [ElementType.PRIMITIVE, []],
            [ElementType.NODE, []],
            [ElementType.MATERIAL, []],
            [ElementType.CAMERA, []],
            [ElementType.SCENE, []],
            [ElementType.SKIN, []],
            [ElementType.TEXTURE, []],
        ]);
        this._elements = [];
        this.semantics = new DefaultSemantics();
    }
    allocateGl(gl) {
        this.bufferCache = new BufferCache(gl);
        for (const mesh of this.meshes) {
            mesh.allocateGl(gl);
        }
    }
    get buffers() {
        return this._getTypeHolder(ElementType.BUFFER);
    }
    get bufferViews() {
        return this._getTypeHolder(ElementType.BUFFERVIEW);
    }
    get accessors() {
        return this._getTypeHolder(ElementType.ACCESSOR);
    }
    get animations() {
        return this._getTypeHolder(ElementType.ANIMATION);
    }
    get meshes() {
        return this._getTypeHolder(ElementType.MESH);
    }
    get nodes() {
        return this._getTypeHolder(ElementType.NODE);
    }
    get materials() {
        return this._getTypeHolder(ElementType.MATERIAL);
    }
    get cameras() {
        return this._getTypeHolder(ElementType.CAMERA);
    }
    get skins() {
        return this._getTypeHolder(ElementType.SKIN);
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
