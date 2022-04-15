import Gltf from '../src/Gltf'
import expect from 'expect.js'
import { expectEqualArray, describeMulti } from './test-utils';
import WebGltfIO from '../src/io/web';
import Mesh from '../src/elements/Mesh';
import Accessor from '../src/elements/Accessor';
import GltfTypes from '../src/types/GltfTypes';


describe("Primitives Morph Targets", function () {

  
  describeMulti( describe, 
    [{
      title : "box (single prim) gltf",
      data : "samples/models/2.0/MorphPrimitivesTest/glTF/MorphPrimitivesTest.gltf"
    },{
      title : "box (single prim) glb",
      data : "samples/models/2.0/MorphPrimitivesTest/glTF-Binary/MorphPrimitivesTest.glb"
    }], 
    function ( path ) {
    
    let gltf:Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf(path).then( res=>gltf=res )
    });



  //   "attributes": {
  //     "NORMAL": 1,
  //     "POSITION": 2
  // },
  // "indices": 0,
  // "mode": 4,
  // "material": 0


    it("mesh has targets", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0]; 
      expect( prim.targets ).to.be.ok()
    });
  

    it("mesh has 1 targets", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0]; 
      expect( prim.targets.length ).to.be(1)
    });
  

  
    it("primitive has position", function () {
      
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0]; 
      const morph = prim.targets[0];
      expect( morph.getSemantic( 'POSITION' ) ).to.be.ok()

    });


    it("primitive position has correct accessor", function () {
      
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0]; 
      const morph = prim.targets[0];
      const pos = morph.getSemantic( 'POSITION' );
      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 4 );
      expect( pos.accessor ).to.be(accessor)
    });



  });
    

});