//@flow
import BaseElement from './BaseElement';
import { ElementType } from '../consts';
const PATH_TRANSLATION = 'translation';
const PATH_ROTATION = 'rotation';
const PATH_SCALE = 'scale';
const PATH_WEIGHTS = 'weights';
function applyTranslation(node, value) {
}
function applyRotation(node, value) {
}
function applyScale(node, value) {
}
function applyWeights(node, value) {
}
function getApplyFunctionFromPath(path) {
    switch (path) {
        case PATH_TRANSLATION:
            return applyTranslation;
        case PATH_ROTATION:
            return applyRotation;
        case PATH_SCALE:
            return applyScale;
        case PATH_WEIGHTS:
            return applyWeights;
        default:
            throw new Error('unsupported path ' + path);
    }
}
export default class AnimationChannel extends BaseElement {
    constructor(gltf, data, animation) {
        super(gltf, data);
        this._active = false;
        this.animation = animation;
        this.sampler = animation.getSampler(data.sampler);
        this.path = data.target.path;
        this.applyFunction = getApplyFunctionFromPath(this.path);
        if (data.target.node !== undefined) {
            this._active = true;
            this.node = gltf.getElement(ElementType.TYPE_NODE, data.target.node);
        }
        this.valueHolder = this.sampler.createElementHolder();
    }
    update(t) {
        if (this._active) {
            this.sampler.evaluate(this.valueHolder, t);
            this.applyFunction(this.node, this.valueHolder);
        }
    }
}
AnimationChannel.TYPE = ElementType.TYPE_ANIMATION_CHANNEL;
