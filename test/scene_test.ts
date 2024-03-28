import expect from 'expect.js';
import Gltf from '../src/Gltf';
import WebGltfIO from '../src/io/web';
import GltfTypes from '../src/types/GltfTypes';


describe("Animation Sampler", function () {

  let gltf :Gltf;

  before(function () {
    return WebGltfIO.loadGltf('samples/other/khronos/lights.gltf').then( res=>gltf=res )
  });


  
  describe("scene access", function () {

    it("with getElement", function () {
      expect( gltf.getElement( GltfTypes.SCENE, 0 ) ).to.be.ok()
    })
 
    it("with scenes", function () {
      expect( gltf.scenes.length ).to.be(1)
    })

  })
  
  describe("scene is ok", function () {


    it("scene name is set", function () {
      expect( gltf.scenes[0].name ).to.be("scene")
    });

    it("scene has 3 nodes", function () {
      expect( gltf.scenes[0].nodes.length ).to.be(3)
    });

    it("scene second node is ok", function () {
      expect( gltf.scenes[0].nodes[1].name ).to.be("directional_light")
    });

  });

});
