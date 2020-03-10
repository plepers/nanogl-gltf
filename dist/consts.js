const TYPES = {};
export const MAGIC = 0x46546C67; // "glTF"
export const JSON_MAGIC = 0x4E4F534A; // "JSON"
export const GLB_HEADER_SIZE = 20;
export var PrimitiveMode;
(function (PrimitiveMode) {
    PrimitiveMode[PrimitiveMode["POINTS"] = 0] = "POINTS";
    PrimitiveMode[PrimitiveMode["LINES"] = 1] = "LINES";
    PrimitiveMode[PrimitiveMode["LINE_LOOP"] = 2] = "LINE_LOOP";
    PrimitiveMode[PrimitiveMode["LINE_STRIP"] = 3] = "LINE_STRIP";
    PrimitiveMode[PrimitiveMode["TRIANGLES"] = 4] = "TRIANGLES";
    PrimitiveMode[PrimitiveMode["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
    PrimitiveMode[PrimitiveMode["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
    PrimitiveMode[PrimitiveMode["DEFAULT"] = 4] = "DEFAULT";
})(PrimitiveMode || (PrimitiveMode = {}));
export var ElementType;
(function (ElementType) {
    ElementType["NONE"] = "";
    ElementType["ACCESSOR"] = "accessors";
    ElementType["ANIMATION"] = "animations";
    ElementType["ASSET"] = "asset";
    ElementType["BUFFER"] = "buffers";
    ElementType["BUFFERVIEW"] = "bufferViews";
    ElementType["MESH"] = "meshes";
    ElementType["PRIMITIVE"] = "primitives";
    ElementType["NODE"] = "nodes";
    ElementType["NORMAL_TEXTURE_INFO"] = "normalTextureInfo";
    ElementType["OCCLUSION_TEXTURE_INFO"] = "occlusionTextureInfo";
    ElementType["CAMERA"] = "cameras";
    ElementType["SAMPLER"] = "samplers";
    ElementType["SCENE"] = "scenes";
    ElementType["SKIN"] = "skins";
    ElementType["IMAGE"] = "images";
    ElementType["TEXTURE"] = "textures";
    ElementType["TEXTURE_INFO"] = "textureInfo";
    ElementType["MATERIAL"] = "materials";
    ElementType["ANIMATION_SAMPLER"] = "animationSamplers";
    ElementType["ANIMATION_CHANNEL"] = "animationChannels";
    ElementType["PBR_METALLIC_ROUGHNESS"] = "pbrMetallicRoughness";
})(ElementType || (ElementType = {}));
;
export const ROOT_TYPES = [
    ElementType.BUFFERVIEW,
    ElementType.ACCESSOR,
    ElementType.MATERIAL,
    ElementType.CAMERA,
    ElementType.MESH,
    ElementType.NODE,
    ElementType.ANIMATION,
    ElementType.SCENE,
    ElementType.SKIN,
];
export const ALL_TYPES = [
    ...ROOT_TYPES,
    ElementType.BUFFER,
    ElementType.ANIMATION_SAMPLER,
    ElementType.ANIMATION_CHANNEL,
    ElementType.PRIMITIVE,
];
