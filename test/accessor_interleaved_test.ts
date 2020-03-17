import Gltf from '../src'
import expect from 'expect.js'
import WebGltfIO from '../src/io/web';
import GltfTypes from '../src/types/GltfTypes';


describe("Interleaved", function () {

  let gltf:Gltf;

  before(function () {
    return WebGltfIO.loadGltf( 'samples/generator/Output/Buffer_Interleaved/Buffer_Interleaved_00.gltf' ).then( res=>gltf=res )
  });




  describe("getValue non normalized", function () {


    it("positions ok", function () {

      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 0 )
      const holder = accessor.createElementHolder();


      // 0 Float32Array( [0.5, -0.5, 0] )
      // 1 Float32Array( [-0.5, -0.5, 0] )
      // 2 Float32Array( [-0.5, 0.5, 0] )
      // 3 Float32Array( [0.5, 0.5, 0] )
      
      accessor.getValue(holder, 1)
      expect(holder[0]).to.equal(-.5);
      expect(holder[1]).to.equal(-.5);
      expect(holder[2]).to.equal(0);
      

      accessor.getValue(holder, 3)
      expect(holder[0]).to.equal(.5);
      expect(holder[1]).to.equal(.5);
      expect(holder[2]).to.equal(0);
      

    });




    it("colors ok", function () {

      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 1 )
      const holder = accessor.createElementHolder();

      accessor.getValue(holder, 1)
      expect(holder[0]).to.equal(1);
      expect(holder[1]).to.equal(0);
      expect(holder[2]).to.equal(0);
      

      accessor.getValue(holder, 3)
      expect(holder[0]).to.equal(0);
      expect(holder[1]).to.equal(0);
      expect(holder[2]).to.equal(1);
      

    });

    it("uvs ok", function () {

      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 2 )
      const holder = accessor.createElementHolder();

      accessor.getValue(holder, 1)
      expect(holder[0]).to.equal(0);
      expect(holder[1]).to.equal(1);
      

      accessor.getValue(holder, 3)
      expect(holder[0]).to.equal(1);
      expect(holder[1]).to.equal(0);
      

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



  describe("getScalar non normalized", function () {


    it("positions ok", function () {
      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 0 )
      let s;
      
      s = accessor.getScalar(1)
      expect(s).to.equal(-.5);
      
      s = accessor.getScalar(3)
      expect(s).to.equal(.5);
      

    });

    it("colors ok", function () {
      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 1 )
      let s;
      
      s = accessor.getScalar(1)
      expect(s).to.equal(1);
      
      s = accessor.getScalar(3)
      expect(s).to.equal(0);
      
      

    });

    it("uvs ok", function () {
      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 2 )
      let s;
      
      s = accessor.getScalar(1)
      expect(s).to.equal(0);
      
      s = accessor.getScalar(3)
      expect(s).to.equal(1);
      

    });


  });


});
