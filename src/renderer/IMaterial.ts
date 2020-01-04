import Node from "nanogl-node";
import Camera from "nanogl-camera";
import Primitive from "../elements/Primitive";
import GLConfig from "nanogl-state/config";


export default interface IMaterial {

    glconfig : GLConfig;

    prepare( node : Node, camera : Camera, primitive : Primitive ) : void;

}