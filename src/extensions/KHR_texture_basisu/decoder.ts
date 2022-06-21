import Texture2D from "nanogl/texture-2d";
import { GLContext } from "nanogl/types";
import Deferred from "../../lib/Deferred";
import { DecodingError, DecodingResponse, SupportedFormats, WorkerResponse } from "./basis.types";


/**
 * type guard check if WorkerResponse is DecodingError
 */
function responseIsError(res: WorkerResponse): res is DecodingError {
  return (res as any).error !== undefined;
}

class PendingDecodingRequest {

  url: string;
  deferred: Deferred<DecodingResponse>;

  get promise(): Promise<DecodingResponse>{
    return this.deferred.promise;
  }

  constructor() {
    this.deferred = new Deferred()
  }

};

export default class BasisDecoder {

  private supportedFormats: SupportedFormats = null;
  private pendingTextures: Record<number, PendingDecodingRequest> = {};
  
  private nextPendingTextureId = 1;
  private allowSeparateAlpha = false;
  private worker: Worker;
  
  constructor( workerUrl: string ) {



    //@ts-ignore
    this.worker = new Worker( workerUrl );

    this.worker.onmessage = (msg : MessageEvent<WorkerResponse>) => {
      // Find the pending texture associated with the data we just received
      // from the worker.
      console.log(msg);
      
      const response = msg.data;
      let pendingTexture = this.pendingTextures[msg.data.id];
      if (!pendingTexture) {
        if (responseIsError(response)) {
          console.error(`Basis transcode failed: ${response.error}`);
        }
        console.error(`Invalid pending texture ID: ${response.id}`);
        return;
      }

      // Remove the pending texture from the waiting list.
      delete this.pendingTextures[response.id];

      // If the worker indicated an error has occured handle it now.
      if (responseIsError(response)) {
        console.error(`Basis transcode failed: ${response.error}`);
        pendingTexture.deferred.reject(`${response.error}`);
        return;
      } else {
        pendingTexture.deferred.resolve( response );
      }

    };
  }


  decode(gl : GLContext, buffer: ArrayBuffer) {
    let pendingTexture = new PendingDecodingRequest();
    this.pendingTextures[this.nextPendingTextureId] = pendingTexture;
    
    this.worker.postMessage({
      id: this.nextPendingTextureId,
      buffer: buffer,
      allowSeparateAlpha: this.allowSeparateAlpha,
      supportedFormats: getSupportedFormats(gl)
    }, [buffer]);

    this.nextPendingTextureId++;
    return pendingTexture.promise;
  }
}


function getSupportedFormats(gl: GLContext) {
  return {
    s3tc:  !!gl.getExtension('WEBGL_compressed_texture_s3tc'),
    etc1:  !!gl.getExtension('WEBGL_compressed_texture_etc1'),
    etc2:  !!gl.getExtension('WEBGL_compressed_texture_etc'),
    pvrtc: !!gl.getExtension('WEBGL_compressed_texture_pvrtc'),
    astc:  !!gl.getExtension('WEBGL_compressed_texture_astc'),
    bptc:  !!gl.getExtension('EXT_texture_compression_bptc')
  };
}

