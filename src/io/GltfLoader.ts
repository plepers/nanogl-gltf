
import Gltf from "..";

import IOInterface from "./IOInterface";
import { MAGIC, GLB_HEADER_SIZE, JSON_MAGIC } from "../consts";
import { ExtensionList } from "../extensions/Registry";
import Gltf2 from "../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement, PropertyOfType } from "../types/Elements";
import GltfTypes from "../types/GltfTypes";
import BaseElement from "../elements/BaseElement";
import Assert from "../lib/assert";

import "../extensions/DefaultExtension"


let UID = 0;

function getUUID(): string {
  return (UID++) + "";
}


export default class GltfLoader {



  gltf: Gltf;

  _url: string;
  _baseUrl: string;
  gltfIO: IOInterface;

  _data: Gltf2.IGLTF;

  _glbData? : ArrayBuffer;

  _extensions: ExtensionList;

  _elements: Map<string, Promise<AnyElement>> = new Map();
  _pendingElements : Promise<AnyElement>[] = []
  _byType  : Map<GltfTypes, Promise<AnyElement>[]> = new Map();
  _propertyMaps  : Map<GltfTypes, Gltf2.Property[]> = new Map();


  constructor(gltfIO: IOInterface, url: string, baseurl: string) {
    this.gltfIO = gltfIO;
    this._url = url;
    this._baseUrl = baseurl;
    this.gltf = new Gltf();
    this._data = null;

    this._extensions = new ExtensionList();
    Gltf._extensionsRegistry.setupExtensions(this);

    // this._defaultFactory = new ElementFactory();
    // this._factory = this._defaultFactory;

  }



  parse = (buffer: ArrayBuffer): Promise<Gltf> => {
    return this.unpack(buffer)
      .then(this.parseAll)
      .then(this.yieldGltf);
  }


  unpack = (buffer: ArrayBuffer): Promise<any> => {
    const magic = new Uint32Array(buffer, 0, 1)[0];

    if (magic === MAGIC) {
      this.unpackGlb(buffer);
    } else {
      const jsonStr = this.gltfIO.decodeUTF8(buffer);
      this._data = JSON.parse(jsonStr);
      this.prepareGltfDatas(this._data);
    }

    return Promise.resolve(true);

  }


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


    // const mbuffer = new Buffer()
    // const bufferData : Gltf2.IBuffer = {
    //   byteLength: bbytes.byteLength,
    //   gltftype: GltfTypes.BUFFER,
    //   uuid: getUUID()
    // }
    // mbuffer.parse(this, bufferData );
    // mbuffer._bytes = bbytes;
    // this._elements.set(bufferData.uuid, Promise.resolve(mbuffer));
    // this.gltf.addElement(mbuffer)

  }



  // loadBuffers = () => {
  //   const buffers: Buffer[] = this.gltf._getTypeHolder(GltfTypes.BUFFER);
  //   for (var i = buffers.length; i < this._data.buffers.length; i++) {
  //     var buffer = new Buffer();
  //     buffer.parse(this, this._data.buffers[i]);
  //     this.gltf.addElement(buffer);
  //   }

  //   return Promise.all(buffers.map(b => this.loadBuffer(b)));

  // }

  resolveUri( uri : string ) : string {
    return this.gltfIO.resolvePath(uri, this._baseUrl);
  }

  // loadBuffer = (b: Buffer) => {
  loadBufferUri = (uri? : string):Promise<ArrayBuffer> =>  {

    if (uri === undefined)
      return Promise.resolve(this._glbData);

    const resolvedUri = this.gltfIO.resolvePath(uri, this._baseUrl);
    return this.gltfIO.loadBinaryResource(resolvedUri)

  }





  // create element
  _createElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>> {
    const extensions = this._extensions._list;
    for (const ext of extensions) {
      const res = ext.loadElement(data)
      if( res === undefined )
        throw new Error( "extensiosn should not return undefined")
      if (res !== null) return res;
    }
    throw new Error( "Unhandled type")
  }


  // create elementif not already created
  _loadElement<P extends Gltf2.Property,>(data: P): Promise<ElementOfType<PropertyType<P>>> {
    let res = this._elements.get(data.uuid) as Promise<ElementOfType<PropertyType<P>>>;
    if (res === undefined) {
      res = this._createElement(data);
      this._pendingElements.push( res );
      this._elements.set(data.uuid, res);
    }
    return res;
  }

  private _getElementHolder<T extends GltfTypes>( type:T ) : Promise<ElementOfType<T>>[] {
    let array : Promise<AnyElement>[] = this._byType.get( type );
    if( array === undefined ){
      array = [];
      this._byType.set( type, array );
    }
    return array as Promise<ElementOfType<T>>[];
  }

  getElement<T extends GltfTypes>( type : T, index : number ): Promise<ElementOfType<T>> {
    const holder = this._getElementHolder( type );
    if( holder[index] !== undefined ) return holder[index];
    // get existing or create if not exist!
    const properties = this._propertyMaps.get(type);
    const property = properties[index];
    return this._loadElement( property ) as Promise<ElementOfType<T>>;
  }


  parseAll = async () => {

    const gltf = this.gltf;

    // verify that required extensions are available
    //, this._data.extensionsUsed, this._data.extensionsRequired
    this._extensions.validate(this._data.extensionsUsed, this._data.extensionsRequired);


    this._loadElement(this._data.asset);

    // TODO: validate asset version


    if (this._data.nodes !== undefined) {
      for (const nodeData of this._data.nodes) {
        this._loadElement(nodeData)
      }
    }

    if (this._data.animations !== undefined) {
      for (const animData of this._data.animations) {
        this._loadElement(animData)
      }
    }

    await this.resolveElements();


  }


  async resolveElements() {

    while( this._pendingElements.length > 0 ){

      const allPromises = this._pendingElements.splice( 0, this._pendingElements.length )
      const allElements = await Promise.all( allPromises );
      this.gltf.addElements( allElements )
    }

  }


  yieldGltf = (): Promise<Gltf> => {
    return Promise.resolve(this.gltf);
  }


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


    // ANIMATION_SAMPLER
    // ANIMATION_CHANNEL

    // NORMAL_TEXTURE_INFO
    // OCCLUSION_TEXTURE_INFO
    // PRIMITIVE
    // TEXTURE_INFO

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


  prepareGltfProperties(elementsData: Gltf2.Property[], type: GltfTypes, parent : Gltf2.Property ) {
    if( elementsData === undefined ) return;
    for (let i = 0; i < elementsData.length; i++) {
      const element = elementsData[i];
      this.prepareGltfProperty( element, type, i, parent );
    }
  }


  prepareGltfRootProperties(elementsData: Gltf2.Property[], type: GltfTypes, parent : Gltf2.Property ) {
    if( elementsData === undefined ) return;
    this._propertyMaps.set( type, elementsData )
    for (let i = 0; i < elementsData.length; i++) {
      const element = elementsData[i];
      this.prepareGltfProperty( element, type, i, parent );
    }

  }


  prepareGltfProperty(element: Gltf2.Property, type: GltfTypes, index : number, parent : Gltf2.Property ) {
    if( element === undefined ) return;
    (element as any).gltftype = type;
    element.uuid = getUUID();
    element.elementIndex  = index;
    element.elementParent = parent;
  }

}

