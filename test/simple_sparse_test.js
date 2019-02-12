import Gltf from '../src'
import expect from 'expect.js'


describe("Triangle", function () {

  const gltf = new Gltf();

  before(function () {
    return gltf.load('samples/models/2.0/SimpleSparseAccessor/glTF/SimpleSparseAccessor.gltf')
  });




  describe("sparse accessors", function () {


    it("sparse positions ok", function () {
      const accessor = gltf.accessors[1]
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


    // it("positions getValues ok", function () {
    //   const accessor = gltf.accessors[1]
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
