import { ElementType } from "../consts";
import BufferView from "../elements/BufferView";
import Accessor from "../elements/Accessor";
import Material from "../elements/Material";
import Camera from "../elements/Camera";
import Mesh from "../elements/Mesh";
import Skin from "../elements/Skin";
import Animation from "../elements/Animation";
import Node from "../elements/Node";
import Scene from "../elements/Scene";
import Asset from "../elements/Asset";
export default class ElementFactory {
    createElement(type) {
        switch (type) {
            case ElementType.BUFFERVIEW: return new BufferView();
            case ElementType.ACCESSOR: return new Accessor();
            case ElementType.ASSET: return new Asset();
            case ElementType.MATERIAL: return new Material();
            case ElementType.CAMERA: return new Camera();
            case ElementType.MESH: return new Mesh();
            case ElementType.NODE: return new Node();
            case ElementType.ANIMATION: return new Animation();
            case ElementType.SKIN: return new Skin();
            case ElementType.SCENE: return new Scene();
            default:
                return null;
        }
    }
}
