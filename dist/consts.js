const TYPES = {};
export var ElementType;
(function (ElementType) {
    ElementType["TYPE_NONE"] = "";
    ElementType["TYPE_BUFFER"] = "buffers";
    ElementType["TYPE_BUFFERVIEW"] = "bufferViews";
    ElementType["TYPE_ACCESSOR"] = "accessors";
    ElementType["TYPE_ANIMATION"] = "animations";
    ElementType["TYPE_MESH"] = "meshes";
    ElementType["TYPE_PRIMITIVE"] = "primitives";
    ElementType["TYPE_NODE"] = "nodes";
    ElementType["TYPE_SCENE"] = "scenes";
    ElementType["TYPE_CAMERA"] = "cameras";
    ElementType["TYPE_SKIN"] = "skins";
    ElementType["TYPE_IMAGE"] = "images";
    ElementType["TYPE_SAMPLER"] = "samplers";
    ElementType["TYPE_TEXTURE"] = "textures";
    ElementType["TYPE_MATERIAL"] = "materials";
    ElementType["TYPE_ANIMATION_SAMPLER"] = "animationSamplers";
    ElementType["TYPE_ANIMATION_CHANNEL"] = "animationChannels";
})(ElementType || (ElementType = {}));
;
export const ROOT_TYPES = [
    ElementType.TYPE_BUFFERVIEW,
    ElementType.TYPE_ACCESSOR,
    ElementType.TYPE_ANIMATION,
    ElementType.TYPE_MESH,
];
export const ALL_TYPES = [
    ...ROOT_TYPES,
    ElementType.TYPE_BUFFER,
    ElementType.TYPE_ANIMATION_SAMPLER,
    ElementType.TYPE_ANIMATION_CHANNEL,
    ElementType.TYPE_PRIMITIVE,
];
