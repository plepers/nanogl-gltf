import { IExtensionFactory, IExtensionInstance } from "../IExtension";
import GltfLoader from "../../io/GltfLoader";
import Gltf2 from "../../types/Gltf2";
import { ElementOfType, PropertyType, AnyElement } from "../../types/Elements";
import { ITextureInfo } from "../../elements/TextureInfo";
import Gltf from "../..";
import TexCoordCollection from "nanogl-pbr/TexCoordCollection";
import { mat3 } from "gl-matrix";

const M3 : mat3 = mat3.create()

const EXT_ID : string = 'KHR_texture_transform';


function isTextureInfo( element : any ) : asserts element is ITextureInfo {
  if( element.createMaterialTexCoords === undefined ){
    throw new Error("KHR_texture_transform used on element which doesn't implement ITextureInfo")
  }
  // const t = element.gltftype
  // return (
  //   t === GltfTypes.TEXTURE_INFO ||  
  //   t === GltfTypes.NORMAL_TEXTURE_INFO ||  
  //   t === GltfTypes.OCCLUSION_TEXTURE_INFO 
  // );
}

interface IExtTransformData{
  offset  ? : [number, number];
  scale   ? : [number, number];
  rotation? : number;
  texCoord? : number;
}

class TransformData {

  readonly offset    : [number, number];
  readonly scale     : [number, number];
  readonly rotation  : number;
  readonly texCoord? : number;

  constructor( extData : IExtTransformData ){
    this.offset   = extData.offset   ?? [0, 0]
    this.scale    = extData.scale    ?? [1, 1]
    this.rotation = extData.rotation ?? 0
    this.texCoord = extData.texCoord
  }

  getMatrix( m3 : mat3 ) : void {
    const cos = Math.cos( this.rotation );
    const sin = Math.sin( this.rotation );
    m3[0]= this.scale[0] * cos
    m3[1]= this.scale[0] * sin
    m3[3]= this.scale[1] * -sin
    m3[4]= this.scale[1] * cos
    m3[6]= this.offset[0]
    m3[7]= this.offset[1]
  }

}


class Instance implements IExtensionInstance {


  readonly name: string = EXT_ID;
  readonly priority: number = -1;
  
  loader: GltfLoader;


  constructor( gltfLoader : GltfLoader) {
    this.loader = gltfLoader;
  }


  setupUVTransform( ){

  }

  wrapElement( element : ITextureInfo, extData : TransformData ){
    element.createMaterialTexCoords = (texCoords : TexCoordCollection)=>{

      extData.getMatrix(M3);
      const index = extData.texCoord ?? element.texCoord;
      const attrib = Gltf.getSemantics().getAttributeName( `TEXCOORD_${index}` )
      const uv = texCoords.getTexCoord(attrib).addStaticTransform( M3 );
      return uv.varying();
    }
  }
  
  acceptElement<P extends Gltf2.Property>(data: P, element: ElementOfType<PropertyType<P>> ) : null | Promise<ElementOfType<PropertyType<P>>> {
    
    if( data.extensions && data.extensions[EXT_ID] ){
      isTextureInfo( element )
      const transformData = new TransformData( data.extensions[EXT_ID] );
      this.wrapElement(element, transformData );
    }
    return Promise.resolve(element);
  }
  
  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;
  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    return null;
  }



}


export default class KHR_texture_transform implements IExtensionFactory {
  readonly name: string = EXT_ID;
  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new Instance(gltfLoader);
  }
}