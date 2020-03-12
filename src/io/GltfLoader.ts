
import Gltf from "..";

import IOInterface from "./IOInterface";
import ElementFactory                              from "./ElementFactory";
import { MAGIC, GLB_HEADER_SIZE, JSON_MAGIC } from "../consts";
import { ExtensionList } from "../extensions/Registry";
import Gltf2 from "../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../types/Elements";
import GltfTypes from "../types/GltfTypes";
import BaseElement from "../elements/BaseElement";




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

  // _defaultFactory : IElementFactory;
  _factory: ElementFactory;
  _extensions: ExtensionList;

  _elements: Map<string, Promise<AnyElement>> = new Map();
  _byType  : Map<GltfTypes, Promise<AnyElement>[]> = new Map();


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


  // loadBuffer = (b: Buffer) => {
  loadBufferUri = (uri? : string):Promise<ArrayBuffer> =>  {

    if (uri === undefined)
      return Promise.resolve(this._glbData);

    const resolvedUri = this.gltfIO.resolvePath(uri, this._baseUrl);
    return this.gltfIO.loadBinaryResource(resolvedUri)

  }


  // createAnimationChannel    ( data:Gltf2.IAnimationChannel, animation :Animation ) : Promise<AnimationChannel>{ return null; }
  // createAnimationSampler    ( data:Gltf2.IAnimationSampler                       ) : Promise<AnimationSampler>{ return null; }
  // createAccessor            ( data:Gltf2.IAccessor                               ) : Promise<Accessor>{ return null; }
  // createAnimation           ( data:Gltf2.IAnimation                              ) : Promise<Animation>{ return null; }
  // createCamera              ( data:Gltf2.ICamera                                 ) : Promise<Camera>{ return null; }
  // createImage               ( data:Gltf2.IImage                                  ) : Promise<Image>{ return null; }
  // createMaterial            ( data:Gltf2.IMaterial                               ) : Promise<Material>{ return null; }
  // createMesh                ( data:Gltf2.IMesh                                   ) : Promise<Mesh>{ return null; }
  // createNode                ( data:Gltf2.INode                                   ) : Promise<Node>{ return null; }
  // createNormalTextureInfo   ( data:Gltf2.IMaterialNormalTextureInfo              ) : Promise<NormalTextureInfo>{ return null; }
  // createOcclusionTextureInfo( data:Gltf2.IMaterialOcclusionTextureInfo           ) : Promise<OcclusionTextureInfo>{ return null; }
  // createPbrMetallicRoughness( data:Gltf2.IMaterialPbrMetallicRoughness           ) : Promise<PbrMetallicRoughness>{ return null; }
  // createPrimitive           ( data:Gltf2.IMeshPrimitive                          ) : Promise<Primitive>{ return null; }
  // createSampler             ( data:Gltf2.ISampler                                ) : Promise<Sampler>{ return null; }
  // createScene               ( data:Gltf2.IScene                                  ) : Promise<Scene>{ return null; }
  // createSkin                ( data:Gltf2.ISkin                                   ) : Promise<Skin>{ return null; }
  // createTexture             ( data:Gltf2.ITexture                                ) : Promise<Texture>{ return null; }
  // createTextureInfo         ( data:Gltf2.ITextureInfo                            ) : Promise<TextureInfo>{ return null; }


  // getElement( data: )




  // create element
  _createElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>> {
    const extensions = this._extensions._list;
    for (const ext of extensions) {
      const res = ext.loadElement(data)
      if (res !== null) return res;
    }
  }


  // create elementif not already created
  _loadElement<P extends Gltf2.Property,>(data: P): Promise<ElementOfType<PropertyType<P>>> {
    let res = this._elements.get(data.uuid) as Promise<ElementOfType<PropertyType<P>>>;
    if (res === undefined) {
      res = this._createElement(data);
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
    return holder[index];
    // get existing or create if not exist!
    return null;
  }


  parseAll = async () => {

    const gltf = this.gltf;

    // verify that required extensions are available
    //, this._data.extensionsUsed, this._data.extensionsRequired
    this._extensions.validate(this._data.extensionsUsed, this._data.extensionsRequired);




    gltf.asset = await this._loadElement(this._data.asset);
    // gltf.asset.parse( this, this._data.asset )

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


  }


  yieldGltf = (): Promise<Gltf> => {
    return Promise.resolve(this.gltf);
  }


  prepareGltfDatas(gltfData: Gltf2.IGLTF) {

    this.prepareGltfProperties( gltfData.accessors  , GltfTypes.ACCESSOR  , null );
    this.prepareGltfProperties( gltfData.animations , GltfTypes.ANIMATION , null );
    this.prepareGltfProperties( [gltfData.asset]    , GltfTypes.ASSET     , null );
    this.prepareGltfProperties( gltfData.buffers    , GltfTypes.BUFFER    , null );
    this.prepareGltfProperties( gltfData.bufferViews, GltfTypes.BUFFERVIEW, null );
    this.prepareGltfProperties( gltfData.cameras    , GltfTypes.CAMERA    , null );
    this.prepareGltfProperties( gltfData.images     , GltfTypes.IMAGE     , null );
    this.prepareGltfProperties( gltfData.materials  , GltfTypes.MATERIAL  , null );
    this.prepareGltfProperties( gltfData.meshes     , GltfTypes.MESH      , null );
    this.prepareGltfProperties( gltfData.nodes      , GltfTypes.NODE      , null );
    this.prepareGltfProperties( gltfData.samplers   , GltfTypes.SAMPLER   , null );
    this.prepareGltfProperties( gltfData.scenes     , GltfTypes.SCENE     , null );
    this.prepareGltfProperties( gltfData.skins      , GltfTypes.SKIN      , null );
    this.prepareGltfProperties( gltfData.textures   , GltfTypes.TEXTURE   , null );


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

