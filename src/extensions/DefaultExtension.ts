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
import { ElementOfType, PropertyType } from "../types/Elements";
import GltfTypes from "../types/GltfTypes";



class DefaultExtensionInstance implements IExtensionInstance {

  readonly name: 'default' = 'default';

  readonly order: number = -1;

  readonly loader: GltfLoader;
  
  constructor(gltfLoader: GltfLoader){
    this.loader = gltfLoader;
  }





  loadElement2<P>( data: P ): P extends Gltf2.ICamera ? number : never {
    
    const _d :  Gltf2.Property = data;

    if( _d.gltftype === GltfTypes.CAMERA ){
      _d.perspective.yfov = 0

      return 0
    }
    
    if( data.gltftype === GltfTypes.CAMERA ){
      data.perspective.yfov = 0
      return 0

    }
    return 0

  }

  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>> {

    const t : PropertyType<P> = null
    const _d :  Gltf2.Property = data;

    if( _d.gltftype === GltfTypes.ACCESSOR ){
      _d.max = [0]
    }
    
    if( data.gltftype === GltfTypes.ACCESSOR ){
      data.max = [0]
    }

    switch (_d.gltftype) {
      case GltfTypes.ACCESSOR                  : return this.createAccessor(_d);
      // case GltfTypes.ANIMATION              : return this.createAnimation(_d);
      // case GltfTypes.ANIMATION_SAMPLER      : return this.createAnimationSampler(_d);
      // case GltfTypes.ANIMATION_CHANNEL      : return this.createAnimationChannel(_d);
      // case GltfTypes.ASSET                  : return this.createAsset(_d);
      // case GltfTypes.BUFFER                 : return this.createBuffer(_d);
      // case GltfTypes.BUFFERVIEW             : return this.createBUFferview(_d);
      // case GltfTypes.CAMERA                 : return this.createCamera(_d);
      // case GltfTypes.IMAGE                  : return this.createImage(_d);
      // case GltfTypes.MATERIAL               : return this.createMaterial(_d);
      // case GltfTypes.MESH                   : return this.createMesh(_d);
      // case GltfTypes.NODE                   : return this.createNode(_d);
      // case GltfTypes.NORMAL_TEXTURE_INFO    : return this.createNormalTextureInfo(_d);
      // case GltfTypes.OCCLUSION_TEXTURE_INFO : return this.createOcclusionTextureInfo(_d);
      // case GltfTypes.PRIMITIVE              : return this.createPrimitive(_d);
      // case GltfTypes.SAMPLER                : return this.createSampler(_d);
      // case GltfTypes.SCENE                  : return this.createScene(_d);
      // case GltfTypes.SKIN                   : return this.createSkin(_d);
      // case GltfTypes.TEXTURE                : return this.createTexture(_d);
      // case GltfTypes.TEXTURE_INFO           : return this.createTextureInfo(_d);

    }
  }

  createAnimationChannel     ( data:Gltf2.IAnimationChannel, animation :Animation ) : null | Promise<AnimationChannel> {
    //el AnimationChannel
    const el = new AnimationChannel();
    el.parse( this.loader, data, animation );
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

  createPbrMetallicRoughness ( data:Gltf2.IMaterialPBRMetallicRoughness           ) : null | Promise<PbrMetallicRoughness> {
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