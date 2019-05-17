
export default interface IOInterface {

  resolveBaseDir( path: string ) : string[];
  resolvePath( path: string, base : string ) : string;
  loadResource(path: string): Promise<string>;
  loadBinaryResource(path: string): Promise<ArrayBuffer>;
  writeResource(path: string, data: string): Promise<Boolean>;
  writeBinaryResource(path: string, data: ArrayBuffer): Promise<Boolean>;
  decodeUTF8( buffer : ArrayBuffer, offset? : number, length? : number ) : string;

  // decodeDataURI( uri : string ) : ArrayBuffer;
  // isDataURI( uri : string ) : Boolean;
  
}
