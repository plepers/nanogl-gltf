import Accessor from "./Accessor";
import GltfLoader from "../io/GltfLoader";
import Gltf2 from "../types/Gltf2";
import GltfTypes from "../types/GltfTypes";
import AccessorSparseIndices from "./AccessorSparseIndices";
import AccessorSparseValues from "./AccessorSparseValues";
import { IElement } from "../types/Elements";
import { GLContext } from "nanogl/types";
import { TypedArray } from "../types/TypedArray";


/**
 * The AccessorSparse element contains the indices and new values of the vertices that are sparse.
 * A sparse vertex is a vertex that differs from the default value of the Accessor.
 */
export default class AccessorSparse implements IElement {

  readonly gltftype : GltfTypes.ACCESSOR_SPARSE = GltfTypes.ACCESSOR_SPARSE;
  name        : undefined | string;
  extras      : any   ;


  /**
   * Accessor element, parent of this AccessorSparse
   */
  accessor:Accessor;

  /**
   * AccessorSparseIndices element, containing indices of the vertices that are sparse
   */
  indices :AccessorSparseIndices;

  /**
   * AccessorSparseValues element, containing new values of the vertices that are sparse
   */
  values  :AccessorSparseValues;


  /**
   * Set of indices of the vertices that are sparse
   */
  indicesSet:Set<number>;

  /**
   * Map of indices of the vertices that are sparse, to the index of the vertex in the sparse data
   */
  indicesMap:Map<number, number>;

  /**
   * set by accessor owning this sparse
   */
  setAccessor(accessor: Accessor) {
    this.accessor = accessor;
  }

  
  /**
   * Parse the AccessorSparse data, load the corresponding Accessor, AccessorSparseIndices and AccessorSparseValues elements.
   * Initialize the indicesSet and indicesMap.
   * 
   * Is async as it needs to wait for the Accessor, AccessorSparseIndices and AccessorSparseValues to be created.
   * @param gltfLoader GLTFLoader to use
   * @param data Data to parse
   * @param args Additional arguments, unused here
   */
  async parse( gltfLoader : GltfLoader, data : Gltf2.IAccessorSparse, ...args : any ) : Promise<any> {

    this.indices = await gltfLoader._loadElement( data.indices );
    this.values = await gltfLoader._loadElement( data.values );

    // this.indices.parse( loader, {
    //   uuid : "-internal-",
    //   gltftype : GltfTypes.ACCESSOR,
    //   bufferView   : iData   .bufferView ,
    //   byteOffset   : iData   .byteOffset ,
    //   componentType: iData   .componentType,
    //   count        : data    .count,
    //   normalized   : accessor.normalized,
    //   type         : Gltf2.AccessorType.SCALAR    
    // });
    
    // let vData = data.values;
    
    // this.values = new Accessor();
    // this.values.parse( loader, {
    //   uuid : "-internal-",
    //   gltftype : GltfTypes.ACCESSOR,
    //   bufferView   : vData   .bufferView ,
    //   byteOffset   : vData   .byteOffset ,
    //   count        : data    .count,
    //   componentType: accessor.componentType,
    //   normalized   : accessor.normalized,
    //   type         : accessor.type
    // });
    

    const iset = this.indicesSet = new Set();
    const imap = this.indicesMap = new Map();


    const indices = this.indices;
    const count = indices.count;
    
    for (let i = 0; i < count; i++) {
      const j = indices.getScalar( i )
      iset.add( j );
      imap.set( j, i );
    }

  }
  

  /**
   * Get the element value at the given index and store it in the given TypedArray
   * @param out TypedArray to store the value in
   * @param index Index of the vertex to get
   */
  getRawValue( out:TypedArray, index: number ){
    const isSparse = this.indicesSet.has( index );
    if( isSparse ){
      this.values.getRawValue( out, this.indicesMap.get(index) );
    }else {
      this.accessor.getRawValue( out, index );
    }
  }

  // getRawValues( out:TypedArray, index: number, size : number ){

  //   for (let i = 0; i < size; i++) {
  //     const findex = index+i
  //     const isSparse = this.indicesSet.has( findex );
      
  //     if( isSparse ){
  //       this.values.getRawValue( out, this.indicesMap.get(findex) );
  //     }else {
  //       this.accessor.getRawValue( out, findex );
  //     }

  //   }
  // }

  /**
   * Get the raw scalar at the given index
   * @param index Index of the vertex to get
   */
  getRawScalar(index:number) : number {
    const isSparse = this.indicesSet.has( index );
    if( isSparse ){
      return this.values.getRawScalar( this.indicesMap.get(index) )
    } else {
      return this.accessor.getRawScalar( index );
    }

  }

}
