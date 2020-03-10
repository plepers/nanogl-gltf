import { mat4 } from 'gl-matrix';
import { ElementType } from '../consts';
import BaseElement from './BaseElement';
export const PROJ_PERSPECTIVE = 'perspective';
export const PROJ_ORTHOGRAPHIC = 'orthographic';
export default class Camera extends BaseElement {
    parse(gltf, data) {
        super.parse(gltf, data);
        this.projection = mat4.create();
        this.type = data.type;
        switch (this.type) {
            case PROJ_PERSPECTIVE:
                this.projectionData = data.perspective;
                this.createPerpective(this.projectionData);
                break;
            case PROJ_ORTHOGRAPHIC:
                this.projectionData = data.orthographic;
                this.createOrtho(this.projectionData);
                break;
            default:
                throw new Error('Camera - unsupported type ' + this.type);
        }
    }
    createPerpective(data) {
        mat4.perspective(this.projection, data.yfov, data.aspect, data.znear, data.zfar);
    }
    createOrtho(data) {
        mat4.ortho(this.projection, -data.xmag * .5, data.xmag * .5, -data.ymag * .5, data.ymag * .5, data.znear, data.zfar);
    }
}
Camera.TYPE = ElementType.CAMERA;
