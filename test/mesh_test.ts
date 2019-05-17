import Gltf from '../src'
import expect from 'expect.js'
import { ElementType } from '../src/consts';
import { expectEqualArray, describeMulti } from './test-utils';
import WebGltfIO from '../src/io/web';
import Mesh from '../src/elements/Mesh';
import Accessor from '../src/elements/Accessor';


describe("Meshes", function () {

  
  describeMulti( describe, 
    [{
      title : "complete gltf",
      data : "samples/models/2.0/Buggy/glTF/Buggy.gltf"
    },{
      title : "complete glb",
      data : 'samples/models/2.0/Buggy/glTF-Binary/Buggy.glb'
    }], 
    function ( path ) {
    
    let gltf:Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf(path).then( res=>gltf=res )
    });



  //   "attributes": {
  //     "NORMAL": 1,
  //     "POSITION": 2
  // },
  // "indices": 0,
  // "mode": 4,
  // "material": 0


    it(" has meshes getter", function () {
      expect( gltf.meshes ).to.be.ok()
    });


    it(" has correct number of meshes", function () {
      expect( gltf.meshes.length ).to.be( 109 )
    });    

  });

});