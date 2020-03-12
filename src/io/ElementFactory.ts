
import BaseElement          from "../elements/BaseElement"          ;
import BufferView           from "../elements/BufferView"           ;
import Accessor             from "../elements/Accessor"             ;
import Material             from "../elements/Material"             ;
import Camera               from "../elements/Camera"               ;
import Mesh                 from "../elements/Mesh"                 ;
import Skin                 from "../elements/Skin"                 ;
import Animation            from "../elements/Animation"            ;
import Node                 from "../elements/Node"                 ;
import Scene                from "../elements/Scene"                ;
import Asset                from "../elements/Asset"                ;
import AnimationChannel     from "../elements/AnimationChannel"     ;
import AnimationSampler     from "../elements/AnimationSampler"     ;
import NormalTextureInfo    from "../elements/NormalTextureInfo"    ;
import OcclusionTextureInfo from "../elements/OcclusionTextureInfo" ;
import PbrMetallicRoughness from "../elements/PbrMetallicRoughness" ;
import Primitive            from "../elements/Primitive"            ;
import Sampler              from "../elements/Sampler"              ;
import Texture              from "../elements/Texture"              ;
import TextureInfo          from "../elements/TextureInfo"          ;

import GltfLoader from "./GltfLoader";
import Gltf2 from "../types/Gltf2";
import Image from "../elements/Image";
import { IExtensionInstance } from "../extensions/IExtension";
import Buffer from "../elements/Buffer";
import { PropertyType, ElementOfType } from "../types/Elements";
import GltfTypes from "../types/GltfTypes";



export default class ElementFactory {
  
  loader: GltfLoader;

  constructor( gltfLoader : GltfLoader ){
    this.loader = gltfLoader;
  }

  createElement( type : GltfTypes ) : BaseElement {

      switch ( type ) {

        // TOP LEVEL
        //===========
        case GltfTypes.ACCESSOR                 : return new Accessor();
        case GltfTypes.ANIMATION                : return new Animation();
        case GltfTypes.BUFFER                   : return new Buffer();
        case GltfTypes.BUFFERVIEW               : return new BufferView();
        case GltfTypes.CAMERA                   : return new Camera();
        case GltfTypes.IMAGE                    : return new Image();
        case GltfTypes.MATERIAL                 : return new Material();
        case GltfTypes.MESH                     : return new Mesh();
        case GltfTypes.NODE                     : return new Node();
        case GltfTypes.SAMPLER                  : return new Sampler();
        case GltfTypes.SCENE                    : return new Scene();
        case GltfTypes.SKIN                     : return new Skin();
        case GltfTypes.TEXTURE                  : return new Texture();
        

        // Subs
        //===========
        case GltfTypes.PRIMITIVE                : return new Primitive();
        case GltfTypes.NORMAL_TEXTURE_INFO      : return new NormalTextureInfo();
        case GltfTypes.OCCLUSION_TEXTURE_INFO   : return new OcclusionTextureInfo();
        case GltfTypes.TEXTURE_INFO             : return new TextureInfo();
        case GltfTypes.ANIMATION_SAMPLER        : return new AnimationSampler();
        case GltfTypes.ANIMATION_CHANNEL        : return new AnimationChannel();
        

      }
  }


  loadElement<P extends Gltf2.Property, >( data : P ) : Promise<ElementOfType<PropertyType<P>>> {
    const extensions = this.loader._extensions._list;
    for (const ext of extensions ) {
      const res = ext.loadElement( data )
      if( res !== null ) return res;
    }
  }



  createAnimationChannel    ( data:Gltf2.IAnimationChannel, animation :Animation ) : Promise<AnimationChannel>{ return null; }
  createAnimationSampler    ( data:Gltf2.IAnimationSampler                       ) : Promise<AnimationSampler>{ return null; }
  createAccessor            ( data:Gltf2.IAccessor                               ) : Promise<Accessor>{ return null; }
  createAnimation           ( data:Gltf2.IAnimation                              ) : Promise<Animation>{ return null; }
  createCamera              ( data:Gltf2.ICamera                                 ) : Promise<Camera>{ return null; }
  createImage               ( data:Gltf2.IImage                                  ) : Promise<Image>{ return null; }
  createMaterial            ( data:Gltf2.IMaterial                               ) : Promise<Material>{ return null; }
  createMesh                ( data:Gltf2.IMesh                                   ) : Promise<Mesh>{ return null; }
  createNode                ( data:Gltf2.INode                                   ) : Promise<Node>{ return null; }
  createNormalTextureInfo   ( data:Gltf2.IMaterialNormalTextureInfo              ) : Promise<NormalTextureInfo>{ return null; }
  createOcclusionTextureInfo( data:Gltf2.IMaterialOcclusionTextureInfo           ) : Promise<OcclusionTextureInfo>{ return null; }
  createPbrMetallicRoughness( data:Gltf2.IMaterialPbrMetallicRoughness           ) : Promise<PbrMetallicRoughness>{ return null; }
  createPrimitive           ( data:Gltf2.IMeshPrimitive                          ) : Promise<Primitive>{ return null; }
  createSampler             ( data:Gltf2.ISampler                                ) : Promise<Sampler>{ return null; }
  createScene               ( data:Gltf2.IScene                                  ) : Promise<Scene>{ return null; }
  createSkin                ( data:Gltf2.ISkin                                   ) : Promise<Skin>{ return null; }
  createTexture             ( data:Gltf2.ITexture                                ) : Promise<Texture>{ return null; }
  createTextureInfo         ( data:Gltf2.ITextureInfo                            ) : Promise<TextureInfo>{ return null; }



}