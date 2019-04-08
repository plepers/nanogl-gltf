import Gltf from '../src'
import expect from 'expect.js'


describe("Interleaved Normalized", function () {


  for (let i = 1; i < 5; i++) {
    
    const suffix = ('0'+i)
  
    describe("normalized "+suffix, function () {

      const gltf = new Gltf();
      before(function () {
        return gltf.load(`samples/generator/Output/Buffer_Interleaved/Buffer_Interleaved_${suffix}.gltf`)
      });

      it("positions ok", function () {

        const accessor = gltf.accessors[0]
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

        const accessor = gltf.accessors[1]
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

        const accessor = gltf.accessors[2]
        const holder = accessor.createElementHolder();

        accessor.getValue(holder, 1)
        expect(holder[0]).to.equal(0);
        expect(holder[1]).to.equal(1);


        accessor.getValue(holder, 3)
        expect(holder[0]).to.equal(1);
        expect(holder[1]).to.equal(0);


      });




      it("getScalar positions ok", function () {
        const accessor = gltf.accessors[0]
        let s;
        
        s = accessor.getScalar(1)
        expect(s).to.equal(-.5);
        
        s = accessor.getScalar(3)
        expect(s).to.equal(.5);
        
  
      });
  
      it("getScalar colors ok", function () {
        const accessor = gltf.accessors[1]
        let s;
        
        s = accessor.getScalar(1)
        expect(s).to.equal(1);
        
        s = accessor.getScalar(3)
        expect(s).to.equal(0);
        
        
  
      });
  
      it("getScalar uvs ok", function () {
        const accessor = gltf.accessors[2]
        let s;
        
        s = accessor.getScalar(1)
        expect(s).to.equal(0);
        
        s = accessor.getScalar(3)
        expect(s).to.equal(1);
        
  
      });
  
  


    });

  }

});
