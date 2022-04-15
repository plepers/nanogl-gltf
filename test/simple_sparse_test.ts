import Gltf from '../src/Gltf'
import expect from 'expect.js'
import WebGltfIO from '../src/io/web';
import GltfTypes from '../src/types/GltfTypes';


describe("Triangle", function () {

  let gltf;

  before(function () {
    return WebGltfIO.loadGltf( 'samples/models/2.0/SimpleSparseAccessor/glTF/SimpleSparseAccessor.gltf' ).then( (res)=>gltf=res )
  });




  describe("sparse accessors", function () {


    it("sparse positions ok", function () {
      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 1 )
      const holder = accessor.createElementHolder();

      accessor.getValue(holder, 8)
      expect(holder[0]).to.equal(1);
      expect(holder[1]).to.equal(2);
      expect(holder[2]).to.equal(0);


      accessor.getValue(holder, 12)
      expect(holder[0]).to.equal(5);
      expect(holder[1]).to.equal(4);
      expect(holder[2]).to.equal(0);

    });

    it("not sparse positions ok", function () {
      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 1 )
      const holder = accessor.createElementHolder();

      accessor.getValue(holder, 9)
      expect(holder[0]).to.equal(2);
      expect(holder[1]).to.equal(1);
      expect(holder[2]).to.equal(0);


    });


    // it("positions getValues ok", function () {
    //   const accessor = gltf.getElement( GltfTypes.ACCESSOR, 1 )
    //   const holder = accessor.createElementHolder();
    //   accessor.getValue( holder, 0 )
    //   expect(holder[0]).to.equal(0);
    //   expect(holder[1]).to.equal(0);
    //   expect(holder[2]).to.equal(0);
    //   accessor.getValue( holder, 1 )
    //   expect(holder[0]).to.equal(1);
    //   expect(holder[1]).to.equal(0);
    //   expect(holder[2]).to.equal(0);
    //   accessor.getValue( holder, 2 )
    //   expect(holder[0]).to.equal(0);
    //   expect(holder[1]).to.equal(1);
    //   expect(holder[2]).to.equal(0);
    // });


  });

});
