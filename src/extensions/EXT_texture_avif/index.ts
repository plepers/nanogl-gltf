import GltfLoader from "../../io/GltfLoader";
import { AnyElement, ElementOfType, PropertyType } from "../../types/Elements";
import Gltf2 from "../../types/Gltf2";
import GltfTypes from "../../types/GltfTypes";
import { IExtensionFactory, IExtensionInstance } from "../IExtension";

const EXT_ID = 'EXT_texture_avif';

const _supported: Promise<boolean> = new Promise<boolean>((resolve) => {
  const image = new Image();
  image.onerror = () => { resolve(false) }/* do something */
  image.onload = () => { resolve(true) }
  image.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
}).then((result: boolean) => {
  return result
})



class EXT_texture_avif_Instance implements IExtensionInstance {
  readonly name: string = EXT_ID;
  readonly priority: number = -10;

  loader: GltfLoader;

  constructor(gltfLoader: GltfLoader) {
    this.loader = gltfLoader;
  }

  acceptElement<P extends Gltf2.Property>(data: P, element: ElementOfType<PropertyType<P>>): null | Promise<ElementOfType<PropertyType<P>>>;

  async acceptElement(data: Gltf2.Property, element: AnyElement): null | Promise<AnyElement> {


    if (element.gltftype === GltfTypes.TEXTURE && data.extensions && data.extensions[EXT_ID]) {
      const isSupported = await _supported;
      if (isSupported) {
        element.source = await this.loader.getElement(GltfTypes.IMAGE, data.extensions[EXT_ID].source);
      }
    }
    return element;
  }

  loadElement<P extends Gltf2.Property>(data: P): Promise<ElementOfType<PropertyType<P>>>;
  loadElement(data: Gltf2.Property): Promise<AnyElement> {
    return null;
  }

}


export default class EXT_texture_avif implements IExtensionFactory {
  readonly name: string = EXT_ID;
  createInstance(gltfLoader: GltfLoader): IExtensionInstance {
    return new EXT_texture_avif_Instance(gltfLoader);
  }

}