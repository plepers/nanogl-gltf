import BaseElement from './BaseElement';
import { ElementType } from '../consts';
import AnimationChannel from './AnimationChannel';
import AnimationSampler from './AnimationSampler';
function createSampler(gltf, data) {
    const sampler = new AnimationSampler();
    sampler.parse(gltf, data);
    return sampler;
}
function createChannel(gltf, data, animation) {
    const channel = new AnimationChannel();
    channel.parse(gltf, data, animation);
    return channel;
}
export default class Animation extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        this.samplers = data.samplers.map(d => createSampler(gltf, d));
        this.gltf.addElements(this.samplers);
        this.channels = data.channels.map(d => createChannel(gltf, d, this));
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
