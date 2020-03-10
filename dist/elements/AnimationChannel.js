import BaseElement from './BaseElement';
import { ElementType } from '../consts';
var Path;
(function (Path) {
    Path["TRANSLATION"] = "translation";
    Path["ROTATION"] = "rotation";
    Path["SCALE"] = "scale";
    Path["WEIGHTS"] = "weights";
})(Path || (Path = {}));
function applyTranslation(node, value) {
    node.position.set(value);
    node.invalidate();
}
function applyRotation(node, value) {
    node.rotation.set(value);
    node.invalidate();
}
function applyScale(node, value) {
    node.scale.set(value);
    node.invalidate();
}
function applyWeights(node, value) {
    node.weights.set(value);
}
function getApplyFunctionFromPath(path) {
    switch (path) {
        case Path.TRANSLATION:
            return applyTranslation;
        case Path.ROTATION:
            return applyRotation;
        case Path.SCALE:
            return applyScale;
        case Path.WEIGHTS:
            return applyWeights;
        default:
            throw new Error('unsupported path ' + path);
    }
}
export default class AnimationChannel extends BaseElement {
    parse(gltf, data, animation) {
        super.parse(gltf, data);
        this._active = false;
        this.path = data.target.path;
        this.applyFunction = getApplyFunctionFromPath(this.path);
        if (data.target.node !== undefined) {
            this._active = true;
            this.node = gltf.getElement(ElementType.NODE, data.target.node);
        }
        this.sampler = animation.getSampler(data.sampler);
        this.valueHolder = this.sampler.createElementHolder();
    }
    evaluate(t) {
        if (this._active) {
            this.sampler.evaluate(this.valueHolder, t);
            this.applyFunction(this.node, this.valueHolder);
        }
    }
}
AnimationChannel.TYPE = ElementType.ANIMATION_CHANNEL;
