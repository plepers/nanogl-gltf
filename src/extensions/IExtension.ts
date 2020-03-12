// import Accessor             from "../elements/Accessor"             ;
// import AnimationChannel     from "../elements/AnimationChannel"     ;
// import AnimationSampler     from "../elements/AnimationSampler"     ;
// import BufferView           from '../elements/BufferView'           ;
// import Buffer               from '../elements/Buffer'               ;
// import Animation            from '../elements/Animation'            ;
// import Node                 from '../elements/Node'                 ;
// import Material             from '../elements/Material'             ;
// import Mesh                 from '../elements/Mesh'                 ;
// import Skin                 from '../elements/Skin'                 ;
// import Camera               from '../elements/Camera'               ;
// import BaseElement          from '../elements/BaseElement'          ;
// import Image                from '../elements/Image'                ;
// import Asset                from '../elements/Asset'                ;
// import Primitive            from "../elements/Primitive"            ;
// import NormalTextureInfo    from "../elements/NormalTextureInfo"    ;
// import OcclusionTextureInfo from "../elements/OcclusionTextureInfo" ;
// import PbrMetallicRoughness from "../elements/PbrMetallicRoughness" ;
// import Sampler              from "../elements/Sampler"              ;
// import Scene                from "../elements/Scene"                ;
// import Texture              from "../elements/Texture"              ;
// import TextureInfo          from "../elements/TextureInfo"          ;

import GltfLoader from "../io/GltfLoader";
import Gltf2 from "../types/Gltf2";
import { ElementOfType, PropertyType } from "../types/Elements";


export interface IExtensionInstance {
  
  readonly name : string;
  readonly order : number;

  // createElement<T extends Gltf2.PropertyType, U extends Gltf2.IProperty>( loader:GltfLoader, data:Gltf2.IProperty ) : null | Promise<Element<T>>;

  loadElement<P extends Gltf2.Property>( data : P ) : null | Promise<ElementOfType<PropertyType<P>>>;


  // createAnimationChannel     ?( loader:GltfLoader, data:Data_AnimationChannel, animation :Animation ) : null | Promise<AnimationChannel>;
  // createAnimationSampler     ?( loader:GltfLoader, data:Data_AnimationSampler                       ) : null | Promise<AnimationSampler>;
  // createAccessor             ?( loader:GltfLoader, data:Data_Accessor                               ) : null | Promise<Accessor>;
  // createAnimation            ?( loader:GltfLoader, data:Data_Animation                              ) : null | Promise<Animation>;
  // createCamera               ?( loader:GltfLoader, data:Data_Camera                                 ) : null | Promise<Camera>;
  // createImage                ?( loader:GltfLoader, data:Data_Image                                  ) : null | Promise<Image>;
  // createMaterial             ?( loader:GltfLoader, data:Data_Material                               ) : null | Promise<Material>;
  // createMesh                 ?( loader:GltfLoader, data:Data_Mesh                                   ) : null | Promise<Mesh>;
  // createNode                 ?( loader:GltfLoader, data:Data_Node                                   ) : null | Promise<Node>;
  // createNormalTextureInfo    ?( loader:GltfLoader, data:Data_MaterialNormalTextureInfo              ) : null | Promise<NormalTextureInfo>;
  // createOcclusionTextureInfo ?( loader:GltfLoader, data:Data_MaterialOcclusionTextureInfo           ) : null | Promise<OcclusionTextureInfo>;
  // createPrimitive            ?( loader:GltfLoader, data:Data_MeshPrimitive                          ) : null | Promise<Primitive>;
  // createSampler              ?( loader:GltfLoader, data:Data_Sampler                                ) : null | Promise<Sampler>;
  // createScene                ?( loader:GltfLoader, data:Data_Scene                                  ) : null | Promise<Scene>;
  // createSkin                 ?( loader:GltfLoader, data:Data_Skin                                   ) : null | Promise<Skin>;
  // createTexture              ?( loader:GltfLoader, data:Data_Texture                                ) : null | Promise<Texture>;
  // createTextureInfo          ?( loader:GltfLoader, data:Data_TextureInfo                            ) : null | Promise<TextureInfo>;

}




export interface IExtensionFactory {
  readonly name : string;
  createInstance( gltfLoader : GltfLoader ) : IExtensionInstance;
}
