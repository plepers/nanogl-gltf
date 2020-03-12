
import Gltf from "..";

import IOInterface from "./IOInterface";
import ElementFactory                              from "./ElementFactory";
import { MAGIC, GLB_HEADER_SIZE, JSON_MAGIC } from "../consts";
import Buffer from "../elements/Buffer";
import { ExtensionList } from "../extensions/Registry";
import Gltf2 from "../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../types/Elements";
import GltfTypes from "../types/GltfTypes";




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

  // _defaultFactory : IElementFactory;
  _factory: ElementFactory;
  _extensions: ExtensionList;

  _elements: Map<string, Promise<AnyElement>>;


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
      .then(this.loadBuffers)
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
    this._data = JSON.parse(scene);
    this.prepareGltfDatas(this._data);


    const bbytes = buffer.slice(GLB_HEADER_SIZE + jsonSize + 8);
    const mbuffer = new Buffer()
    const bufferData : Gltf2.IBuffer = {
      byteLength: bbytes.byteLength,
      gltftype: GltfTypes.BUFFER,
      uuid: getUUID()
    }
    mbuffer.parse(this, bufferData );
    mbuffer._bytes = bbytes;
    this._elements.set(bufferData.uuid, Promise.resolve(mbuffer));
    this.gltf.addElement(mbuffer)

  }



  loadBuffers = () => {
    const buffers: Buffer[] = this.gltf._getTypeHolder(GltfTypes.BUFFER);
    for (var i = buffers.length; i < this._data.buffers.length; i++) {
      var buffer = new Buffer();
      buffer.parse(this, this._data.buffers[i]);
      this.gltf.addElement(buffer);
    }

    return Promise.all(buffers.map(b => this.loadBuffer(b)));

  }


  loadBuffer = (b: Buffer) => {

    if (b.uri === undefined)
      return (b._bytes);

    const uri = this.gltfIO.resolvePath(b.uri, this._baseUrl);
    return this.gltfIO.loadBinaryResource(uri)
      .then(data => b._bytes = data);

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


  parseAll = async () => {

    const gltf = this.gltf;

    // verify that required extensions are available
    //, this._data.extensionsUsed, this._data.extensionsRequired
    this._extensions.validate(this._data.extensionsUsed, this._data.extensionsRequired);




    gltf.asset = await this._createElement(this._data.asset);
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
    this.prepareGltfData(gltfData.accessors, GltfTypes.ACCESSOR);
    this.prepareGltfData(gltfData.animations, GltfTypes.ANIMATION);
    this.prepareGltfData(gltfData.buffers, GltfTypes.BUFFER);
    this.prepareGltfData(gltfData.bufferViews, GltfTypes.BUFFERVIEW);
    this.prepareGltfData(gltfData.cameras, GltfTypes.CAMERA);
    this.prepareGltfData(gltfData.images, GltfTypes.IMAGE);
    this.prepareGltfData(gltfData.materials, GltfTypes.MATERIAL);
    this.prepareGltfData(gltfData.meshes, GltfTypes.MESH);
    this.prepareGltfData(gltfData.nodes, GltfTypes.NODE);
    this.prepareGltfData(gltfData.samplers, GltfTypes.SAMPLER);
    this.prepareGltfData(gltfData.scenes, GltfTypes.SCENE);
    this.prepareGltfData(gltfData.skins, GltfTypes.SKIN);
    this.prepareGltfData(gltfData.textures, GltfTypes.TEXTURE);
  }


  prepareGltfData(elementsData: Gltf2.IProperty[], type: GltfTypes) {
    for (const e of elementsData) {
      (e as any).gltftype = type;
      e.uuid = getUUID();
    }
  }

}

