

import Gltf from '../src'
import expect from 'expect.js'
import { expectEqualArray } from './test-utils';


describe("Animation Sampler", function () {

  const gltf = new Gltf();

  before(function () {
    return gltf.load( 'samples/models/2.0/AnimatedTriangle/glTF/AnimatedTriangle.gltf' )
  });


  
  describe("parsing OK", function () {

    it("sampler OK", function () {
      expect( gltf.animations[0] ).to.be.ok()
      expect( gltf.animations[0].channels[0] ).to.be.ok()
      expect( gltf.animations[0].channels[0].sampler ).to.be.ok()
    })

    it("sampler input OK", function () {
      const sampler = gltf.animations[0].channels[0].sampler;
      expect( sampler.input ).to.be.ok()
    })

    it("sampler output OK", function () {
      const sampler = gltf.animations[0].channels[0].sampler;
      expect( sampler.output ).to.be.ok()
    })

  })
  
  describe("getValue", function () {


    it("t < 0", function () {
      const sampler = gltf.animations[0].channels[0].sampler;
      const out = sampler.createElementHolder();
      sampler.evaluate( out, -1 )

      expectEqualArray( out, new Float32Array([0, 0, 0, 1]))

    });

    it("t > max", function () {
      const sampler = gltf.animations[0].channels[0].sampler;
      const out = sampler.createElementHolder();
      sampler.evaluate( out, 1000 )

      expectEqualArray( out, new Float32Array([0, 0, 0, 1]))

    });

    it("t = 0", function () {
      const sampler = gltf.animations[0].channels[0].sampler;
      const out = sampler.createElementHolder();
      sampler.evaluate( out, 0 )

      expectEqualArray( out, new Float32Array([0, 0, 0, 1]))

    });

    it("t = 1", function () {

      const sampler = gltf.animations[0].channels[0].sampler;
      const out = sampler.createElementHolder();
      sampler.evaluate( out, 1 )

      expectEqualArray( out, new Float32Array([0, 0, 0, 1]))

    });

    it("t = .25", function () {
      const sampler = gltf.animations[0].channels[0].sampler;
      const out = sampler.createElementHolder();
      sampler.evaluate( out, .25 )

      expectEqualArray( out, new Float32Array([ 0, 0, 0.7070, .7070 ]))

    });




  });

});
