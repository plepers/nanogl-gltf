import { ElementType } from "../consts";
let UID = 0;
function ElementMixin(Base) {
    var _a;
    return _a = class extends Base {
            static CreateUID() {
                return UID++;
            }
            parse(gltf, data, ...args) {
                this.uid = BaseElement.CreateUID();
                this.gltf = gltf;
                this.name = data.name;
                this.extras = data.extras;
                this.extensions = data.extensions;
            }
            get elementType() {
                return this.constructor['TYPE'];
            }
        },
        _a.TYPE = ElementType.NONE,
        _a;
}
export { ElementMixin };
export default class BaseElement extends ElementMixin(Object) {
}
