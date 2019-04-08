import Gltf from '../src'
import expect from 'expect.js'


describe("Triangle", function () {

  const gltf= new Gltf();

  before(function () {
    return gltf.load('samples/models/2.0/Triangle/glTF/Triangle.gltf')
  });
  


  describe("buffers", function () {
    
    it("has buffer", function () {
      expect(gltf.buffers[0]).to.be.ok();
    });

    it("buffer bytes is ok", function () {
      console.log( gltf.buffers.length );
      console.log( gltf.buffers[0]._bytes );
      expect(gltf.buffers[0]._bytes).to.be.ok();
    });

    it("buffer byteLength property is ok", function () {
      expect(gltf.buffers[0].byteLength).to.equal( 44 );
    });
    
    it("buffer _bytes length is ok", function () {
      expect(gltf.buffers[0]._bytes.byteLength ).to.equal( 44 );
    });

  });



  describe("bufferViews", function () {
    

    it("byteLength ok", function () {
      expect(gltf.bufferViews[0].byteLength).to.equal(6);
      expect(gltf.bufferViews[1].byteLength).to.equal(36);
    });

    it("byteOffset ok", function () {
      expect(gltf.bufferViews[0].byteOffset).to.equal(0);
      expect(gltf.bufferViews[1].byteOffset).to.equal(8);
    });

    it("target ok", function () {
      expect(gltf.bufferViews[0].target).to.equal(34963);
      expect(gltf.bufferViews[1].target).to.equal(34962);
    });

    it("buffer resolve ok", function () {
      expect(gltf.bufferViews[0].buffer).to.equal(gltf.buffers[0]);
      expect(gltf.bufferViews[1].buffer).to.equal(gltf.buffers[0]);
    });

  });



  describe("accessors", function () {
    

    it("indices createElementHolder ok", function () {
      const holder = gltf.accessors[0].createElementHolder();
      expect(holder.constructor).to.equal(Uint16Array);
      expect(holder.length).to.equal(1);
    });
    

    it("indices getValues ok", function () {
      const accessor = gltf.accessors[0]
      const holder = accessor.createElementHolder();
      accessor.getValue( holder, 0 )
      expect(holder[0]).to.equal(0);
      accessor.getValue( holder, 1 )
      expect(holder[0]).to.equal(1);
      accessor.getValue( holder, 2 )
      expect(holder[0]).to.equal(2);
    });
    
    
    it("positions createElementHolder ok", function () {
      const holder = gltf.accessors[1].createElementHolder();
      expect(holder.constructor).to.equal(Float32Array);
      expect(holder.length).to.equal(3);
    });
    

    it("positions getValues ok", function () {
      const accessor = gltf.accessors[1]
      const holder = accessor.createElementHolder();
      accessor.getValue( holder, 0 )
      expect(holder[0]).to.equal(0);
      expect(holder[1]).to.equal(0);
      expect(holder[2]).to.equal(0);
      accessor.getValue( holder, 1 )
      expect(holder[0]).to.equal(1);
      expect(holder[1]).to.equal(0);
      expect(holder[2]).to.equal(0);
      accessor.getValue( holder, 2 )
      expect(holder[0]).to.equal(0);
      expect(holder[1]).to.equal(1);
      expect(holder[2]).to.equal(0);
    });


  });

});
