

import Gltf from '../src'
import expect from 'expect.js'
import { expectEqualArray } from './test-utils';


describe("Animation Sampler ", function () {

  const gltf = new Gltf();

  before(function () {
    return gltf.load('samples/models/2.0/InterpolationTest/glTF/InterpolationTest.gltf')
  });

  const CUBIC_SCALE_TEST_SET = [
    [ 0.36, 0.5308012962341309   ],
    [ 1.192, 0.5321827530860901  ],
    [ 1.795, 1                   ],
    [ 0.033, 1                   ],
    [ 0.821, 0.98081374168396    ],
    [ 1.248, 0.5000424981117249  ],
    [ 0.828, 0.9853049516677856  ],
    [ 0.648, 0.753545343875885   ],
    [ 1.219, 0.509685754776001   ],
    [ 0.099, 0.9685112833976746  ],
    [ 0.869, 0.9997451901435852  ],
    [ 0.11, 0.9562432765960693   ],
    [ 1.835, 1                   ],
    [ 1.353, 0.5765559077262878  ],
    [ 0.058, 0.9972370266914368  ],
    [ 1.609, 0.973919153213501   ],
    [ 0.465, 0.5155082941055298  ],
    [ 0.754, 0.9138557314872742  ],
    [ 0.303, 0.6099657416343689  ],
    [ 1.33, 0.5482181310653687   ],
    [ 1.569, 0.9304637312889099  ],
    [ 1.642, 0.994950532913208   ],
    [ 0.586, 0.654315710067749   ],
    [ 1.776, 1                   ],
    [ 1.774, 1                   ],
  ]
    
  describe("getValue", function () {


    it("t < 0", function () {

      //CubicSpline Scale
      const sampler = gltf.animations[2].channels[0].sampler;
      const out = sampler.createElementHolder();

      var arr = []

      // PLOT
      // ======
      // for (let i = 0; i < 2.0; i += .002) {
      //   sampler.getValueAtTime(out, i)
      //   arr.push( i + ', '+ out[0] )
      // }

      // var lll = arr.join('\n');
      // console.log( lll )

      // gen test set
      // ============
      // for (let i = 0; i < 25; i++) {
      //   var t = Math.random( ) * 2;
      //   t = Math.round( t*1000)/1000;

      //   sampler.getValueAtTime(out, t)
      //   arr.push( t + ', '+ out[0] )
      // }

      // var lll = arr.join('\n');
      // console.log( lll )

      for (const tset of CUBIC_SCALE_TEST_SET) {
        sampler.getValueAtTime(out, tset[0]);
        expect( out[0]).to.be.equal( tset[1] );
      }

    });

  });

});
