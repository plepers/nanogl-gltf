
import Gltf from "../Gltf";

import IOInterface from "./IOInterface";
import { ExtensionList } from "../extensions/Registry";
import Gltf2 from "../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement, PromiseElementForProperty } from "../types/Elements";
import GltfTypes from "../types/GltfTypes";

import "../extensions/DefaultExtension"
import { GltfLoaderOptions } from "./GltfLoaderOptions";
import { IMaterial } from "../elements/Material";
import Assert from "../lib/assert";
import { AbortSignal } from "@azure/abort-controller";


let UID = 0;

function getUUID(): string {
  return (UID++) + "";
}


const defaultMaterialData : Gltf2.IMaterial = {
  gltftype : GltfTypes.MATERIAL,
  elementIndex : -1,
  elementParent : null,
  uuid : '_default_mat_',
  name : 'default',
}


export class PendingElement {

  readonly data : Gltf2.IProperty;
  readonly promise : Promise<AnyElement>

  constructor( data: Gltf2.IProperty, element: Promise<AnyElement> ){
    this.data = data;
    this.promise = element;
  }

}



const MAGIC      = 0x46546C67; // "glTF"
const JSON_MAGIC = 0x4E4F534A; // "JSON"
const GLB_HEADER_SIZE = 20;

const GL_LINEAR = 9729;


/**
 * This class is used to load a Gltf file and its resources, including extensions processing.
 */
export default class GltfLoader {

  /**
   * Gltf object which will be filled with the data from the Gltf file
   */
  gltf: Gltf;

  /**
   * Gltf file path
   */
  _url: string;

  /**
   * Resolved base directory of the Gltf file
   */
  _baseUrl: string;

  /**
   * Implementation of IOInterface made for GLTFs
   */
  gltfIO: IOInterface;

  /**
   * Gltf data file content, parsed as JSON from the GLTF/GLB file
   */
  _data: Gltf2.IGLTF;

  /**
   * If the loaded file is a GLB file (binary GLTF), data such as images or shaders can be stored as base64-encoded binary data directly in the GLB file.
   * This buffer contains the decoded data.
   */
  _glbData? : ArrayBuffer;

  /**
   * List of extensions activated on this loader
   */
  _extensions: ExtensionList;

  /**
   * Map of all created elements from the Gltf data file, by uuid
   */
  _elements: Map<string, Promise<AnyElement>> = new Map();

  /**
   * List of elements that are being created, waiting to be resolved and added to the Gltf object
   */
  _pendingElements : PendingElement[] = []

  /**
   * Map of all elements of the Gltf data file, ordered by type
   */
  _byType  : Map<GltfTypes, Promise<AnyElement>[]> = new Map();

  /**
   * Map of all properties of the Gltf data file, ordered by type
   */
  _propertyMaps  : Map<GltfTypes, Gltf2.Property[]> = new Map();

  /**
   * Abort signal if you want to be able to cancel the request at any time
   */
  readonly abortSignal: AbortSignal;

  /**
   * Texture's minFilter to use when there is no specified one in this loader's options or in textures' samplers
   * @default GL_LINEAR
   */
  readonly defaultTextureFilter : GLenum

  /**
   * @param gltfIO Implementation of IOInterface made for GLTFs
   * @param url Gltf file path
   * @param options Options for Gltf loader
   */
  constructor(gltfIO: IOInterface, url: string, options : GltfLoaderOptions = {} ) {
    this.gltfIO = gltfIO;

    this._url = url;
    this._baseUrl = options.baseurl;

    this.abortSignal = options.abortSignal ?? AbortSignal.none;
    this.defaultTextureFilter = options.defaultTextureFilter ?? GL_LINEAR;

    if( this._baseUrl === undefined ){
      [this._baseUrl, this._url] = gltfIO.resolveBaseDir( this._url );
    }

    this.gltf = new Gltf();
    this._data = null;

    this._extensions = new ExtensionList();
    Gltf.getExtensionsRegistry().setupExtensions( this, options.extensions );

  }

  /**
   * Load and return the gltf file
   */
  async load(): Promise<Gltf> {
    const buffer = await this.gltfIO.loadBinaryResource( this.gltfIO.resolvePath( this._url, this._baseUrl ), this.abortSignal )
    this.unpack(buffer)
    await this.parseAll()
    return this.gltf
  }

  /**
   * Parse the buffer then prepare it for loading by adding uuids, types and indexes
   * If the buffer represents a GLTF file (plain JSON), il will be parsed directly.
   * If the buffer represents a GLB file (binary), it will be first decoded, then parsed.
   * @param buffer Buffer to unpack
   */
  unpack( buffer: ArrayBuffer ): void {
    const magic = new Uint32Array(buffer, 0, 1)[0];

    if (magic === MAGIC) {
      this.unpackGlb(buffer);
    } else {
      const jsonStr = this.gltfIO.decodeUTF8(buffer);
      this._data = JSON.parse(jsonStr);
      this.prepareGltfDatas(this._data);
    }
  }

  /**
   * Decode a buffer representing a binary GLB file, then parse it and prepare it for loading
   * @param buffer Buffer to unpack
   */
  unpackGlb(buffer: ArrayBuffer) {

    const [, version, , jsonSize, magic] = new Uint32Array(buffer, 0, 5);
    // Check that the version is 2
    if (version !== 2)
      throw new Error('Binary glTF version is not 2');

    // Check that the scene format is 0, indicating that it is JSON
    if (magic !== JSON_MAGIC)
      throw new Error('Binary glTF scene format is not JSON');

    const scene = this.gltfIO.decodeUTF8(buffer, GLB_HEADER_SIZE, jsonSize);
    this._glbData = buffer.slice(GLB_HEADER_SIZE + jsonSize + 8);
    this._data = JSON.parse(scene);
    this.prepareGltfDatas(this._data);

  }

  /**
   * Resolve an absolute file path relative to this loader base directory
   * @param uri URI to resolve
   */
  resolveUri( uri : string ) : string {
    return this.gltfIO.resolvePath(uri, this._baseUrl);
  }

  // loadBuffer = (b: Buffer) => {

  /**
   * Load a buffer from an URI, if no URI is provided the _glbData buffer will be returned
   * @param uri URI to load
   */
  loadBufferUri = (uri? : string):Promise<ArrayBuffer> =>  {
    if (uri === undefined)
      return Promise.resolve(this._glbData);

      const resolvedUri = this.gltfIO.resolvePath(uri, this._baseUrl);
    return this.gltfIO.loadBinaryResource(resolvedUri, this.abortSignal)
  }

  /**
   * If element has no name or extras, give it the ones from the data
   * @param data Data to add
   * @param element Element to add data on
   */
  parseCommonGltfProperty<P extends Gltf2.Property>(data: P, element:ElementOfType<PropertyType<P>>){
    if( element.name === undefined ) {
      element.name = (data as Gltf2.IChildRootProperty).name;
    }
    if( element.extras === undefined ) {
      element.extras = data.extras;
    }
  }
  
  /**
   * Create a Gltf element from its raw data, with extension handling if needed.
   * @param data Element data coming from the .gltf file
   */
  async _createElement<P extends Gltf2.Property>(data: P): PromiseElementForProperty<P> {
    const element = await this._createElementInstance( data );
    this.parseCommonGltfProperty( data, element );
    return this._extensionsAccept( data, element );
  }

  /**
   * Create a Gltf element from its raw data, passing it through all the loader's extensions.
   * If no extension handles this specific element, a basic corresponding element will be created.
   * @param data Element data coming from the .gltf file
   */
  _createElementInstance<P extends Gltf2.Property>(data: P): PromiseElementForProperty<P> {
    const extensions = this._extensions._list;
    for (const ext of extensions) {
      const res = ext.loadElement(data)
      if( res === undefined )
        throw new Error( "extension should not return undefined")
      if (res !== null) return res;
    }
    throw new Error( "Unhandled type")
  }

  /**
   * Some extensions may want to modify the element after it has been created, this method will call all the extensions that want to do so.
   * @param data Element data coming from the .gltf file
   * @param element Corresponding element already created
   */
  async _extensionsAccept<P extends Gltf2.Property>(data: P, element : ElementOfType<PropertyType<P>> ): PromiseElementForProperty<P> {
    const extensions = this._extensions._list;
    let res : PromiseElementForProperty<P>;

    for (const ext of extensions) {
      res = ext.acceptElement( data, element )  
      if( res !== null ){
        element = await res;
      }
    }
    return element;
  }

  /**
   * Load an element from its data, if the element is already loaded it will be returned directly.
   * @param data Data to load
   */
  _loadElement<P extends Gltf2.Property,>(data: P): PromiseElementForProperty<P> {
    let res = this._elements.get(data.uuid) as PromiseElementForProperty<P>;
    if (res === undefined) {
      res = this._createElement(data);
      const pe = new PendingElement( data, res );
      this._pendingElements.push( pe );
      this._elements.set(data.uuid, res);
    }
    return res;
  }

  /**
   * Provide a default material if needed. Used for Primitives that don't have a material.
   */
  loadDefaultMaterial() : Promise<IMaterial>{
    return this._loadElement(defaultMaterialData);
  }

  /**
   * Get the array of elements of a given type. If the array doesn't exist, it will be created.
   * @param type Type of elements to get
   */
  private _getElementHolder<T extends GltfTypes>( type:T ) : Promise<ElementOfType<T>>[] {
    let array : Promise<AnyElement>[] = this._byType.get( type );
    if( array === undefined ){
      array = [];
      this._byType.set( type, array );
    }
    return array as Promise<ElementOfType<T>>[];
  }

  /**
   * Get an element of a given type and index. If the element doesn't exist, it will be created by retrieving its data from the Gltf data file.
   * @param type Element's type
   * @param index Element's index
   */
  getElement<T extends GltfTypes>( type : T, index : number ): Promise<ElementOfType<T>> {
    const holder = this._getElementHolder( type );
    if( holder[index] !== undefined ) return holder[index];
    // get existing or create if not exist!
    const properties = this._propertyMaps.get(type);
    const property = properties[index];
    return this._loadElement( property ) as Promise<ElementOfType<T>>;
  }

  /**
   * Parse all prepared elements of the Gltf data file, create them and add them to the Gltf object
   */
  async parseAll(): Promise<void>{

    this._extensions.validate(this._data.extensionsUsed, this._data.extensionsRequired);

    const asset = await this._loadElement(this._data.asset);
    if( asset.version != '2.0' ){
      console.warn(`Gltf version should be "2.0" found "${asset.version}"` );
    } 

    await this._loadElements( this._data.scenes );
    await this._loadElements( this._data.nodes );
    await this._loadElements( this._data.animations );
    await this.resolveElements();

  }
  
  /**
   * Load multiple elements from their data
   * @param dataList Array of elements to load
   */
  private _loadElements<T extends Gltf2.Property>( dataList? : T[] ) : Promise<void> {
    if (dataList !== undefined) {
      const promises = dataList.map( (data)=>this._loadElement(data))
      return Promise.all( promises ).then();
    }
  }

  /**
   * Wait for all pending elements creation to complete and register them in Gltf object
   */
  async resolveElements() {

    while( this._pendingElements.length > 0 ){

      const pelements = this._pendingElements.splice( 0, this._pendingElements.length )
      const elements = await Promise.all( pelements.map( (pe)=>pe.promise ) );
      for (let i = 0; i < pelements.length; i++) {
        const element = elements[i];
        Assert.isDefined( element.gltftype );
        this.gltf.addElement( elements[i], pelements[i].data.elementIndex );
      }
    }

  }

  /**
   * Parse the Gltf data and prepare it for loading
   * @param gltfData Gltf data to parse
   */
  prepareGltfDatas(gltfData: Gltf2.IGLTF) {

    this.prepareGltfRootProperties( gltfData.accessors  , GltfTypes.ACCESSOR  , null );
    this.prepareGltfRootProperties( gltfData.animations , GltfTypes.ANIMATION , null );
    this.prepareGltfRootProperties( [gltfData.asset]    , GltfTypes.ASSET     , null );
    this.prepareGltfRootProperties( gltfData.buffers    , GltfTypes.BUFFER    , null );
    this.prepareGltfRootProperties( gltfData.bufferViews, GltfTypes.BUFFERVIEW, null );
    this.prepareGltfRootProperties( gltfData.cameras    , GltfTypes.CAMERA    , null );
    this.prepareGltfRootProperties( gltfData.images     , GltfTypes.IMAGE     , null );
    this.prepareGltfRootProperties( gltfData.materials  , GltfTypes.MATERIAL  , null );
    this.prepareGltfRootProperties( gltfData.meshes     , GltfTypes.MESH      , null );
    this.prepareGltfRootProperties( gltfData.nodes      , GltfTypes.NODE      , null );
    this.prepareGltfRootProperties( gltfData.samplers   , GltfTypes.SAMPLER   , null );
    this.prepareGltfRootProperties( gltfData.scenes     , GltfTypes.SCENE     , null );
    this.prepareGltfRootProperties( gltfData.skins      , GltfTypes.SKIN      , null );
    this.prepareGltfRootProperties( gltfData.textures   , GltfTypes.TEXTURE   , null );



    if( gltfData.animations !== undefined ){
      for (const animation of gltfData.animations) {
        this.prepareGltfProperties( animation.samplers, GltfTypes.ANIMATION_SAMPLER, animation );
        this.prepareGltfProperties( animation.channels, GltfTypes.ANIMATION_CHANNEL, animation );
      }
    }

    if( gltfData.materials !== undefined ){
      for (const material of gltfData.materials) {
        this.prepareGltfProperty( material.normalTexture, GltfTypes.NORMAL_TEXTURE_INFO, -1, material );
        this.prepareGltfProperty( material.occlusionTexture, GltfTypes.OCCLUSION_TEXTURE_INFO, -1, material );
        this.prepareGltfProperty( material.emissiveTexture, GltfTypes.TEXTURE_INFO, -1, material );

        if( material.pbrMetallicRoughness !== undefined ){
          this.prepareGltfProperty( material.pbrMetallicRoughness.baseColorTexture, GltfTypes.TEXTURE_INFO, -1, material );
          this.prepareGltfProperty( material.pbrMetallicRoughness.metallicRoughnessTexture, GltfTypes.TEXTURE_INFO, -1, material );
        }
      }
    }

    if( gltfData.meshes !== undefined ){
      for (const mesh of gltfData.meshes) {
        this.prepareGltfProperties( mesh.primitives, GltfTypes.PRIMITIVE, mesh );
      }
    }

    if( gltfData.accessors !== undefined ){
      for (const accessor of gltfData.accessors) {
        this.prepareGltfProperty( accessor.sparse, GltfTypes.ACCESSOR_SPARSE, -1, accessor );
        if( accessor.sparse !== undefined ){
          this.prepareGltfProperty( accessor.sparse.indices, GltfTypes.ACCESSOR_SPARSE_INDICES, -1, accessor.sparse );
          this.prepareGltfProperty( accessor.sparse.values, GltfTypes.ACCESSOR_SPARSE_VALUES, -1, accessor.sparse );
        }
      }
    }

  }

  /**
   * Prepare multiple Gltf properties for loading, having the same type and parent
   * @param elementsData Elements to prepare
   * @param type Elements' type
   * @param parent Elements' parent
   */
  prepareGltfProperties(elementsData: Gltf2.Property[], type: GltfTypes, parent : Gltf2.Property ) {
    if( elementsData === undefined ) return;
    for (let i = 0; i < elementsData.length; i++) {
      const element = elementsData[i];
      this.prepareGltfProperty( element, type, i, parent );
    }
  }

  /**
   * Prepare multiple Gltf root properties for loading, having the same type and parent.
   * A root property is a property that doesn't have a parent in the Gltf data.
   * @param elementsData Elements to prepare
   * @param type Elements' type
   * @param parent Elements' parent
   */
  prepareGltfRootProperties(elementsData: Gltf2.Property[], type: GltfTypes, parent : Gltf2.Property ) {
    if( elementsData === undefined ) return;
    this._propertyMaps.set( type, elementsData )
    for (let i = 0; i < elementsData.length; i++) {
      const element = elementsData[i];
      this.prepareGltfProperty( element, type, i, parent );
    }

  }

  /**
   * Prepare Gltf property for loading by adding him a uuid, a type, an index and a parent
   * @param element Element to prepare
   * @param type Element's type
   * @param index Element's index
   * @param parent Element's parent
   */
  prepareGltfProperty( element: Gltf2.Property, type: GltfTypes, index : number, parent : Gltf2.Property ) {
    if( element === undefined ) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (element as any).gltftype = type;

    element.uuid = getUUID();
    element.elementIndex  = index;
    element.elementParent = parent;
  }

}
