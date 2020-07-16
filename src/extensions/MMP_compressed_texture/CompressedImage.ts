import Image from "../../elements/Image";
import GltfLoader from "../../io/GltfLoader";
import Gltf2 from "../../types/Gltf2";
import TextureLoader from "./TextureLoader";
import TextureDefinition from "./KTXParser";
import Texture2D from "nanogl/texture-2d";

export default class CompressedImage extends Image {

  texDataSource: TextureDefinition;

  async parseCompressed(gltfLoader: GltfLoader, data: Gltf2.IImage, texLoader: TextureLoader): Promise<any> {

    const codec = texLoader.getCodec();
    if (data.uri) {
      this.uri = data.uri;
      this.resolvedUri = gltfLoader.resolveUri(this.uri);
      this.resolvedUri = codec.transformPath(this.resolvedUri);
    }

    let rawData = await gltfLoader.gltfIO.loadBinaryResource(this.resolvedUri, gltfLoader.abortSignal);
    this.texDataSource = codec.parser.parse(rawData);

  }

  public async setupTexture(texture: Texture2D, requirePOT : boolean = false, genMipmaps : boolean = false) {

    const gl = texture.gl;

    texture.bind();

    var mips = this.texDataSource.surfaces[0];
    var fmt = this.texDataSource.format;
    var w = this.texDataSource.width;
    var h = this.texDataSource.height;

    for (var i = 0; i < mips.length; i++) {
      var m = mips[i]
      gl.compressedTexImage2D(gl.TEXTURE_2D, i, fmt, w, h, 0, m);
      w = w >> 1;
      h = h >> 1;
    };


  }

}