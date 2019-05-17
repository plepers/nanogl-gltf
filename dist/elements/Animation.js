//@flow
import BaseElement from './BaseElement';
import { ElementType } from '../consts';
import AnimationChannel from './AnimationChannel';
import AnimationSampler from './AnimationSampler';
export default class Animation extends BaseElement {
    constructor(gltf, data) {
        super(gltf, data);
        this.samplers = data.samplers.map(d => new AnimationSampler(gltf, d, this));
        this.gltf.addElements(this.samplers);
        this.channels = data.channels.map(d => new AnimationChannel(gltf, d, this));
        this.gltf.addElements(this.channels);
    }
    evaluate(t) {
        for (var channel of this.channels) {
            channel.evaluate(t);
        }
    }
    getChannel(i) {
        return this.channels[i];
    }
    getSampler(i) {
        return this.samplers[i];
    }
}
Animation.TYPE = ElementType.ANIMATION;
