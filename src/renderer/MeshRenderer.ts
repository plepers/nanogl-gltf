import Node from "../elements/Node"
import Mesh from "../elements/Mesh"
import GLState from 'nanogl-state/state'
import GLConfig from 'nanogl-state/config'
import Camera from 'nanogl-camera'

export default class MeshRenderer {

  node: Node;
  mesh: Mesh;

  constructor(node: Node) {
    this.node = node;
    this.mesh = node.mesh;
  }

  render(glstate: GLState, camera: Camera, mask: number, cfg: GLConfig) {





    const primitives = this.mesh.primitives;
    

    for (let i = 0; i < primitives.length; i++) {

      const primitive = primitives[i];
      const mat = primitive.material;



      mat.prepare(this, camera, sub)

      // push configs
      // -------------

      state.push(mat.config);

      if (this.cfg)
        state.push(this.cfg);
      // optional cfg
      if (cfg)
        state.push(cfg);

      state.apply()

      // render
      // ----------
      this.drawCall(camera, mat.prg, sub, mat);

      // pop configs
      // -------------

      state.pop();

      if (this.cfg)
        state.pop();

      if (cfg)
        state.pop();

    }

  }

}