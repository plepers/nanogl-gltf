import { GLContext } from 'nanogl/types';
import KTXParser from "./KTXParser";

const DXT_EXTS = [
  'WEBGL_compressed_texture_s3tc',
  'MOZ_WEBGL_compressed_texture_s3tc',
  'WEBKIT_WEBGL_compressed_texture_s3tc',
]

const PVR_EXTS = [
  'WEBGL_compressed_texture_pvrtc',
  'WEBKIT_WEBGL_compressed_texture_pvrtc',
]

const ETC_EXTS = [
  'WEBGL_compressed_texture_etc1',
  'WEBKIT_WEBGL_compressed_texture_etc1',
]

// TODO
// const ASTC_EXTS = [
//   'WEBGL_compressed_texture_astc'
// ]


enum ExtId {
  DXT,
  PVR,
  ETC,
}

let EXTS : Record<ExtId, any> = null

function _pickExtension(gl : GLContext, array : string[] ) : any {
  var ext = null;
  for (const extStr of array) {
      ext = gl.getExtension(extStr);
      if (ext)
          break;
  }
  return ext;
}

function pickExtension(id : ExtId) {

  if( EXTS === null ){
    EXTS = {} as Record<ExtId, any>

    let cvs = document.createElement("canvas");
    let gl = (cvs.getContext('webgl2', {}) ||
        cvs.getContext('webgl', {}) ||
        cvs.getContext('experimental-webgl', {}) ||
        cvs.getContext('webgl')) as GLContext;

    EXTS[ExtId.DXT] = _pickExtension(gl, DXT_EXTS)
    EXTS[ExtId.PVR] = _pickExtension(gl, PVR_EXTS)
    EXTS[ExtId.ETC] = _pickExtension(gl, ETC_EXTS)
    let loseExt = gl.getExtension('WEBGL_lose_context');
    if (loseExt) {
      loseExt.loseContext();
    }

  }
   
  return EXTS[id];
}

export class TextureCodec {

  parser: KTXParser;
  suffix: string;
  compressed: boolean;
  ext: GLenum;

  constructor(parser, compressed, suffix, extension) {

    this.parser = parser;
    this.suffix = suffix;
    this.compressed = compressed;

    this.ext = extension;

  }


  transformPath = (basePath) => {
    return basePath + this.suffix;
  }


  isSupported() {
    return !!this.ext || (!this.compressed);
  }

}


export default class TextureLoader {


  DXTCodec: TextureCodec
  PVRCodec: TextureCodec
  ETCCodec: TextureCodec
  // TODO
  // ASTCCodec: TextureCodec

  constructor() {

    this.DXTCodec = new TextureCodec(new KTXParser(), true, '.dxt.ktx', pickExtension(ExtId.DXT));
    this.PVRCodec = new TextureCodec(new KTXParser(), true, '.pvr.ktx', pickExtension(ExtId.PVR));
    this.ETCCodec = new TextureCodec(new KTXParser(), true, '.etc.ktx', pickExtension(ExtId.ETC));

    // TODO
    // this.ASTCCodec = new TextureCodec(new KTXParser(), true, '.astc.ktx', pickExtension(gl, ASTC_EXTS));

  }

  hasCodec() {

    return this.DXTCodec.isSupported() ||
      this.DXTCodec.isSupported() ||
      this.ETCCodec.isSupported()

  }

  getCodec() {

    // TODO
    // if (this.ASTCCodec.isSupported()) {
    //   return this.ASTCCodec
    // }

    if (this.DXTCodec.isSupported()) {
      return this.DXTCodec
    }
    else if (this.PVRCodec.isSupported()) {
      return this.PVRCodec
    }
    else if (this.ETCCodec.isSupported()) {
      return this.ETCCodec
    }

  }


}