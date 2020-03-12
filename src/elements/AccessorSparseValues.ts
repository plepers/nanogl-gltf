import BaseElement from "./BaseElement";
import GltfTypes from "../types/GltfTypes";
import GltfLoader from "../io/GltfLoader";
import Gltf2 from "../types/Gltf2";
import { BaseAccessor, getArrayForDataType } from "./Accessor";
import Assert from "../lib/assert";

export default class AccessorSparseValues extends BaseAccessor {

  readonly gltftype : GltfTypes.ACCESSOR_SPARSE_VALUES = GltfTypes.ACCESSOR_SPARSE_VALUES;

  async parse( gltfLoader : GltfLoader, data : Gltf2.IAccessorSparseValues ) : Promise<any> {

    super.parse( gltfLoader, data );

    const sparseData : Gltf2.IAccessorSparse = data.elementParent as Gltf2.IAccessorSparse;
    const accessorData : Gltf2.IAccessor = sparseData.elementParent as Gltf2.IAccessor;

    this.byteOffset     = data.byteOffset ?? 0;
    
    this.count          = sparseData.count;
    this.normalized     = accessorData.normalized ?? false;
    this.componentType  = accessorData.componentType;
    this.type           = accessorData.type;
    
    
    
    
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