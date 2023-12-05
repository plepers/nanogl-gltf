import GltfTypes from "../types/GltfTypes";
import GltfLoader from "../io/GltfLoader";
import Gltf2 from "../types/Gltf2";
import { BaseAccessor, getArrayForDataType } from "./Accessor";
import Assert from "../lib/assert";
import { IElement } from "../types/Elements";


/**
 * The AccessorSparseValues element is an Accessor that contains the new values of the vertices that are sparse.
 */
export default class AccessorSparseValues extends BaseAccessor implements IElement {

  readonly gltftype : GltfTypes.ACCESSOR_SPARSE_VALUES = GltfTypes.ACCESSOR_SPARSE_VALUES;
  name        : undefined | string;
  extras      : any   ;


  /**
   * Parse the AccessorSparseValues data, load the BufferView element and store only the part that is needed in _array attribute.
   * 
   * Is async as it needs to wait for the BufferView to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   */
  async parse( gltfLoader : GltfLoader, data : Gltf2.IAccessorSparseValues ) : Promise<any> {

    const sparseData : Gltf2.IAccessorSparse = data.elementParent as Gltf2.IAccessorSparse;
    const accessorData : Gltf2.IAccessor = sparseData.elementParent as Gltf2.IAccessor;

    this.byteOffset     = data.byteOffset ?? 0;
    
    this.count          = sparseData.count;
    this.normalized     = accessorData.normalized ?? false;
    this.componentType  = accessorData.componentType;
    this.type           = accessorData.type;
    
    this.sparse = null;
    
    
    
    this.bufferView     = await gltfLoader.getElement( GltfTypes.BUFFERVIEW, data.bufferView );
    const Arr = getArrayForDataType(this.componentType);

    if( this.bufferView.byteStride === 0 ){
      this._stride      = this.numComps * this.bytesPerElem;
      this._strideElem  = this.numComps;
    } else {
      this._stride      = this.bufferView.byteStride;
      this._strideElem  = this._stride / Arr.BYTES_PER_ELEMENT;
      Assert.isTrue( this._strideElem === Math.round( this._strideElem ) );
    }
    
    this._array = new Arr( this.bufferView.buffer._bytes, this.byteOffset + this.bufferView.getByteOffset(), this.count * this._strideElem );
    
    this._valueHolder = this.createElementHolder();

    return Promise.resolve();
 
  }

}
