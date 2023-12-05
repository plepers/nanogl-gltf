


import Node from './Node';
import { mat4 } from 'gl-matrix';
import Gltf2 from '../types/Gltf2';
import GltfLoader from '../io/GltfLoader';
import GltfTypes from '../types/GltfTypes';
import { IElement } from '../types/Elements';


const M4 = mat4.create()


/**
 * The Skin element contains the joints nodes and inverse bind matrices used to animate a mesh.
 */
export default class Skin implements IElement {

  readonly gltftype: GltfTypes.SKIN = GltfTypes.SKIN;
  name: undefined | string;
  extras: any;


  /**
   * Array of inverse bind matrices, one for each joint
   */
  inverseBindMatrices: mat4[];

  /**
   * Root node of the skeleton
   */
  skeletonRoot: Node;

  /**
   * Array of all joints nodes
   */
  joints: Node[];


  /**
   * Parse the Skin data.
   * 
   * Is async as it needs to wait for all the skeleton root and joints Nodes,
   * and the possible inverseBindMatrices Accessor to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse(gltfLoader: GltfLoader, data: Gltf2.ISkin) {

    const jointPromises = data.joints.map(idx => gltfLoader.getElement(GltfTypes.NODE, idx))
    this.joints = await Promise.all(jointPromises);

    this.inverseBindMatrices = this.joints.map(mat4.create);

    if (data.inverseBindMatrices !== undefined) {
      const ibmAccessor = await gltfLoader.getElement(GltfTypes.ACCESSOR, data.inverseBindMatrices);
      this.inverseBindMatrices.forEach((m, i) => ibmAccessor.getValue(m, i))
    }

    if (data.skeleton !== undefined) {
      this.skeletonRoot = await gltfLoader.getElement(GltfTypes.NODE, data.skeleton);
    }

  }

  /**
   * Compute the joints matrices, used to animate the skin.
   * @param skinnedNode Skinned node to compute the joints matrices for
   * @param jointMatrices Joints matrices to compute
   */
  computeJoints(skinnedNode: Node, jointMatrices: mat4[]) {
    if (jointMatrices.length !== this.joints.length) {
      throw new Error("Skin.computeJoints(), jointMatrices size must match joints size")
    }

    mat4.invert( M4, skinnedNode._wmatrix );

    for (let i = 0; i < this.joints.length; i++) {
      const joint = this.joints[i];
      const ibm = this.inverseBindMatrices[i];
      const jointMatrix = jointMatrices[i];
      mat4.mul(jointMatrix, joint._wmatrix, ibm);
      mat4.mul(jointMatrix, M4, jointMatrix);
    }
  }

}
