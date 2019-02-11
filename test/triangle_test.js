import Gltf from '../src'
import expect from 'expect.js'


describe("Triangle", function () {

  const gltf= new Gltf();

  before(function () {
    return gltf.load('samples/Triangle/glTF/Triangle.gltf')
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
      expect(gltf.buffers[0].byteLength).to.be.equal( 44 );
    });
    
    it("buffer _bytes length is ok", function () {
      expect(gltf.buffers[0]._bytes.byteLength ).to.be.equal( 44 );
    });

  });



  describe("bufferViews", function () {
    

    it("byteLength ok", function () {
      expect(gltf.bufferViews[0].byteLength).to.be.equal(6);
      expect(gltf.bufferViews[1].byteLength).to.be.equal(36);
    });

    it("byteOffset ok", function () {
      expect(gltf.bufferViews[0].byteOffset).to.be.equal(0);
      expect(gltf.bufferViews[1].byteOffset).to.be.equal(8);
    });

    it("target ok", function () {
      expect(gltf.bufferViews[0].target).to.be.equal(34963);
      expect(gltf.bufferViews[1].target).to.be.equal(34962);
    });

    it("buffer resolve ok", function () {
      expect(gltf.bufferViews[0].buffer).to.be.equal(gltf.buffers[0]);
      expect(gltf.bufferViews[1].buffer).to.be.equal(gltf.buffers[0]);
    });

  });



  describe("accessors", function () {
    

    it("indices createElementHolder ok", function () {
      const holder = gltf.accessors[0].createElementHolder();
      expect(holder.constructor).to.be.equal(Uint16Array);
      expect(holder.length).to.be.equal(1);
    });
    

    it("indices getValues ok", function () {
      const accessor = gltf.accessors[0]
      const holder = accessor.createElementHolder();
      accessor.getValue( holder, 0 )
      expect(holder[0]).to.be.equal(0);
      accessor.getValue( holder, 1 )
      expect(holder[0]).to.be.equal(1);
      accessor.getValue( holder, 2 )
      expect(holder[0]).to.be.equal(2);
    });
    
    
    it("positions createElementHolder ok", function () {
      const holder = gltf.accessors[1].createElementHolder();
      expect(holder.constructor).to.be.equal(Float32Array);
      expect(holder.length).to.be.equal(3);
    });
    

    it("positions getValues ok", function () {
      const accessor = gltf.accessors[1]
      const holder = accessor.createElementHolder();
      accessor.getValue( holder, 0 )
      expect(holder[0]).to.be.equal(0);
      expect(holder[1]).to.be.equal(0);
      expect(holder[2]).to.be.equal(0);
      accessor.getValue( holder, 1 )
      expect(holder[0]).to.be.equal(1);
      expect(holder[1]).to.be.equal(0);
      expect(holder[2]).to.be.equal(0);
      accessor.getValue( holder, 2 )
      expect(holder[0]).to.be.equal(0);
      expect(holder[1]).to.be.equal(1);
      expect(holder[2]).to.be.equal(0);
    });


  });

});
