const TYPES = {};
export const MAGIC = 0x46546C67; // "glTF"
export const JSON_MAGIC = 0x4E4F534A; // "JSON"
export const GLB_HEADER_SIZE = 20;
export var ElementType;
(function (ElementType) {
    ElementType["NONE"] = "";
    ElementType["BUFFER"] = "buffers";
    ElementType["BUFFERVIEW"] = "bufferViews";
    ElementType["ACCESSOR"] = "accessors";
    ElementType["ANIMATION"] = "animations";
    ElementType["MESH"] = "meshes";
    ElementType["PRIMITIVE"] = "primitives";
    ElementType["NODE"] = "nodes";
    ElementType["SCENE"] = "scenes";
    ElementType["CAMERA"] = "cameras";
    ElementType["SKIN"] = "skins";
    ElementType["IMAGE"] = "images";
    ElementType["SAMPLER"] = "samplers";
    ElementType["TEXTURE"] = "textures";
    ElementType["MATERIAL"] = "materials";
    ElementType["ANIMATION_SAMPLER"] = "animationSamplers";
    ElementType["ANIMATION_CHANNEL"] = "animationChannels";
})(ElementType || (ElementType = {}));
;
export const ROOT_TYPES = [
    ElementType.BUFFERVIEW,
    ElementType.ACCESSOR,
    ElementType.ANIMATION,
    ElementType.MESH,
];
export const ALL_TYPES = [
    ...ROOT_TYPES,
    ElementType.BUFFER,
    ElementType.ANIMATION_SAMPLER,
    ElementType.ANIMATION_CHANNEL,
    ElementType.PRIMITIVE,
];
