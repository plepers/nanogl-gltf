import { IExtensionInstance, IExtensionFactory } from "./IExtension";
import GltfLoader from "../io/GltfLoader";

import Animation            from "../elements/Animation"            ;
import AnimationChannel     from "../elements/AnimationChannel"     ;
import AnimationSampler     from "../elements/AnimationSampler"     ;
import Accessor             from "../elements/Accessor"             ;
import Camera               from "../elements/Camera"               ;
import Material             from "../elements/Material"             ;
import Mesh                 from "../elements/Mesh"                 ;
import NormalTextureInfo    from "../elements/NormalTextureInfo"    ;
import OcclusionTextureInfo from "../elements/OcclusionTextureInfo" ;
import PbrMetallicRoughness from "../elements/PbrMetallicRoughness" ;
import Primitive            from "../elements/Primitive"            ;
import Sampler              from "../elements/Sampler"              ;
import Scene                from "../elements/Scene"                ;
import Skin                 from "../elements/Skin"                 ;
import Texture              from "../elements/Texture"              ;
import TextureInfo          from "../elements/TextureInfo"          ;
import Node                 from "../elements/Node"                 ;
import Image                from "../elements/Image"                ;
import Gltf from "..";
import Gltf2 from "../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../types/Elements";
import GltfTypes from "../types/GltfTypes";
import Asset from "../elements/Asset";
import Buffer from "../elements/Buffer";
import BufferView from "../elements/BufferView";



class DefaultExtensionInstance implements IExtensionInstance {

  readonly name: 'default' = 'default';

  readonly order: number = -1;

  readonly loader: GltfLoader;
  
  constructor(gltfLoader: GltfLoader){
    this.loader = gltfLoader;
  }


  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;

  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    
    switch (data.gltftype) {
      case GltfTypes.ACCESSOR               : return this.createAccessor(data);
      case GltfTypes.ANIMATION              : return this.createAnimation(data);
      case GltfTypes.ANIMATION_SAMPLER      : return this.createAnimationSampler(data);
      case GltfTypes.ANIMATION_CHANNEL      : return this.createAnimationChannel(data);
      case GltfTypes.ASSET                  : return this.createAsset(data);
      case GltfTypes.BUFFER                 : return this.createBuffer(data);
      case GltfTypes.BUFFERVIEW             : return this.createBufferview(data);
      case GltfTypes.CAMERA                 : return this.createCamera(data);
      case GltfTypes.IMAGE                  : return this.createImage(data);
      case GltfTypes.MATERIAL               : return this.createMaterial(data);
      case GltfTypes.MESH                   : return this.createMesh(data);
      case GltfTypes.NODE                   : return this.createNode(data);
      case GltfTypes.NORMAL_TEXTURE_INFO    : return this.createNormalTextureInfo(data);
      case GltfTypes.OCCLUSION_TEXTURE_INFO : return this.createOcclusionTextureInfo(data);
      case GltfTypes.PRIMITIVE              : return this.createPrimitive(data);
      case GltfTypes.SAMPLER                : return this.createSampler(data);
      case GltfTypes.SCENE                  : return this.createScene(data);
      case GltfTypes.SKIN                   : return this.createSkin(data);
      case GltfTypes.TEXTURE                : return this.createTexture(data);
      case GltfTypes.TEXTURE_INFO           : return this.createTextureInfo(data);

    }
  }

  createAsset  ( data : Gltf2.IAsset ) : null | Promise<Asset> {
    const el = new Asset();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }
  
  createBuffer  ( data : Gltf2.IBuffer ) : null | Promise<Buffer> {
    const el = new Buffer();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createBufferview  ( data : Gltf2.IBufferView ) : null | Promise<BufferView> {
    const el = new BufferView();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createAnimationChannel     ( data:Gltf2.IAnimationChannel ) : null | Promise<AnimationChannel> {
    //el AnimationChannel
    const el = new AnimationChannel();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createAnimationSampler     ( data:Gltf2.IAnimationSampler                       ) : null | Promise<AnimationSampler> {
    //el AnimationSampler
    const el = new AnimationSampler();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createAccessor             ( data:Gltf2.IAccessor                               ) : null | Promise<Accessor> {
    //el Accessor
    const el = new Accessor();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createAnimation            ( data:Gltf2.IAnimation                              ) : null | Promise<Animation> {
    //el Animation
    const el = new Animation();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createCamera               ( data:Gltf2.ICamera                                 ) : null | Promise<Camera> {
    //el Camera
    const el = new Camera();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createImage                ( data:Gltf2.IImage                                  ) : null | Promise<Image> {
    //el Image
    const el = new Image();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createMaterial             ( data:Gltf2.IMaterial                               ) : null | Promise<Material> {
    //el Material
    const el = new Material();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createMesh                 ( data:Gltf2.IMesh                                   ) : null | Promise<Mesh> {
    //el Mesh
    const el = new Mesh();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createNode                 ( data:Gltf2.INode                                   ) : null | Promise<Node> {
    //el Node
    const el = new Node();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createNormalTextureInfo    ( data:Gltf2.IMaterialNormalTextureInfo              ) : null | Promise<NormalTextureInfo> {
    //el NormalTextureInfo
    const el = new NormalTextureInfo();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createOcclusionTextureInfo ( data:Gltf2.IMaterialOcclusionTextureInfo           ) : null | Promise<OcclusionTextureInfo> {
    //el OcclusionTextureInfo
    const el = new OcclusionTextureInfo();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createPbrMetallicRoughness ( data:Gltf2.IMaterialPbrMetallicRoughness           ) : null | Promise<PbrMetallicRoughness> {
    //el PbrMetallicRoughness
    const el = new PbrMetallicRoughness();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createPrimitive            ( data:Gltf2.IMeshPrimitive                          ) : null | Promise<Primitive> {
    //el Primitive
    const el = new Primitive();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createSampler              ( data:Gltf2.ISampler                                ) : null | Promise<Sampler> {
    //el Sampler
    const el = new Sampler();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createScene                ( data:Gltf2.IScene                                  ) : null | Promise<Scene> {
    //el Scene
    const el = new Scene();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createSkin                 ( data:Gltf2.ISkin                                   ) : null | Promise<Skin> {
    //el Skin
    const el = new Skin();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createTexture              ( data:Gltf2.ITexture                                ) : null | Promise<Texture> {
    //el Texture
    const el = new Texture();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }

  createTextureInfo          ( data:Gltf2.ITextureInfo                            ) : null | Promise<TextureInfo> {
    //el TextureInfo
    const el = new TextureInfo();
    el.parse( this.loader, data );
    return Promise.resolve(el);
  }



}


class DefaultExtensionFactory implements IExtensionFactory {

  name: 'default' = 'default';

  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new DefaultExtensionInstance( gltfLoader );
  }
  
}

const defaultExtension = new DefaultExtensionFactory();

Gltf.addExtension( defaultExtension );