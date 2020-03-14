import Gltf from '../src'
import expect from 'expect.js'
import { expectEqualArray, describeMulti } from './test-utils';
import WebGltfIO from '../src/io/web';
import Mesh from '../src/elements/Mesh';
import Accessor from '../src/elements/Accessor';


describe("Embedded Buffer", function () {
  
  let gltf:Gltf;
  
  before(function () {
    return WebGltfIO.loadGltf('samples/models/2.0/Cameras/glTF-Embedded/Cameras.gltf').then( res=>gltf=res )
  });
  
  
  it(" is defined", function () {
    expect( gltf.buffers[0]).to.be.ok()
  });


  it(" have correct length", function () {
    expect( gltf.buffers[0].byteLength ).to.be(60)
    expect( gltf.buffers[0]._bytes.byteLength ).to.be(60)
  })

  it(" have correct data", function () {
    const u32 = new Uint32Array( gltf.buffers[0]._bytes );
    expect( u32[0] ).to.be( 0x10000 )
    expect( u32[1] ).to.be( 0x10002)
    expect( u32[6] ).to.be( 0x3F800000 )
  })

});