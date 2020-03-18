

import Gltf from '../src'
import expect from 'expect.js'
import { expectEqualArray } from './test-utils';
import WebGltfIO from '../src/io/web';
import GltfTypes from '../src/types/GltfTypes';
import { TypedArray } from '../src/types/TypedArray';
import { SamplerEvaluator } from '../src/elements/AnimationSampler';


describe("Animation Sampler", function () {

  let gltf :Gltf;

  before(function () {
    return WebGltfIO.loadGltf('samples/models/2.0/AnimatedTriangle/glTF/AnimatedTriangle.gltf').then( res=>gltf=res )
  });


  
  describe("parsing OK", function () {

    it("sampler OK", function () {
      expect( gltf.getElement( GltfTypes.ANIMATION, 0 ) ).to.be.ok()
      expect( gltf.getElement( GltfTypes.ANIMATION, 0 ).channels[0] ).to.be.ok()
      expect( gltf.getElement( GltfTypes.ANIMATION, 0 ).channels[0].sampler ).to.be.ok()
    })

    it("sampler input OK", function () {
      const sampler = gltf.getElement( GltfTypes.ANIMATION, 0 ).channels[0].sampler;
      expect( sampler.input ).to.be.ok()
    })

    it("sampler output OK", function () {
      const sampler = gltf.getElement( GltfTypes.ANIMATION, 0 ).channels[0].sampler;
      expect( sampler.output ).to.be.ok()
    })

  })
  
  describe("getValue", function () {

    let out : TypedArray;
    let evaluator : SamplerEvaluator

    before( function(){

      const channel = gltf.getElement( GltfTypes.ANIMATION, 0 ).channels[0]
      const sampler = channel.sampler;
      evaluator = sampler.createEvaluator(channel.path, 1)
      out = evaluator.createElementHolder();
    })


    it("t < 0", function () {
      evaluator.evaluate( out, -1 )
      expectEqualArray( out, new Float32Array([0, 0, 0, 1]))
    });

    it("t > max", function () {
      evaluator.evaluate( out, 1000 )
      expectEqualArray( out, new Float32Array([0, 0, 0, 1]))
    });

    it("t = 0", function () {
      evaluator.evaluate( out, 0 )
      expectEqualArray( out, new Float32Array([0, 0, 0, 1]))
    });

    it("t = 1", function () {
      evaluator.evaluate( out, 1 )
      expectEqualArray( out, new Float32Array([0, 0, 0, 1]))
    });

    it("t = .25", function () {
      evaluator.evaluate( out, .25 )
      expectEqualArray( out, new Float32Array([ 0, 0, 0.7070, .7070 ]))
    });




  });

});
