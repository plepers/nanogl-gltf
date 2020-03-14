import Gltf from '../src'
import expect from 'expect.js'
import { expectEqualArray, describeMulti } from './test-utils';
import WebGltfIO from '../src/io/web';
import Mesh from '../src/elements/Mesh';
import Accessor from '../src/elements/Accessor';
import GltfTypes from '../src/types/GltfTypes';


describe("Primitives", function () {

  
  describeMulti( describe, 
    [{
      title : " box (single prim) gltf",
      data : "samples/models/2.0/Box/glTF/Box.gltf"
    },{
      title : " box (single prim) glb",
      data : 'samples/models/2.0/Box/glTF-Binary/Box.glb'
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


    it("mesh has primitives", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      expect( m.primitives ).to.be.ok()
    });
    
    it("mesh has one primitive", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      expect( m.primitives.length ).to.be(1)
    });
    
    it("primitive has attributes", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0];
      expect( prim.attributes ).to.be.ok()
    })

    it("primitive has position", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0];
      expect( prim.attributes.getSemantic( 'POSITION' ) ).to.be.ok()
    });

    it("primitive has normal", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0];
      expect( prim.attributes.getSemantic( 'NORMAL' ) ).to.be.ok()
    });

    it("primitive has 2 attribs", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0];
      expect( prim.attributes.length ).to.be(2)
    });


    it("primitive position has correct accessor", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0];
      const pos = prim.attributes.getSemantic( 'POSITION' );
      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 2 );
      expect( pos.accessor.byteOffset ).to.be(288)
      expect( pos.accessor ).to.be(accessor)
    });


    it("primitive mode is ok", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0];
      expect( prim.mode ).to.be(4)
    });


    it("primitive has indices", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0];
      expect( prim.indices ).to.be.ok()

      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 0 );
      expect( prim.indices ).to.be( accessor )
    });


    it("primitive has material", function () {
      const m = gltf.getElement( GltfTypes.MESH, 0 );
      const prim = m.primitives[0];
      expect( prim.material ).to.be.ok()

    });



  });
  


  describeMulti( describe, 
    [{
      title : "multi prim gltf",
      data : "samples/models/2.0/Buggy/glTF/Buggy.gltf"
    },{
      title : "multi prim glb",
      data : 'samples/models/2.0/Buggy/glTF-Binary/Buggy.glb'
    }], 
    function ( path ) {
    

  //   {
  //     "primitives": [
  //         {
  //             "attributes": {
  //                 "NORMAL": 91,
  //                 "POSITION": 92
  //             },
  //             "indices": 90,
  //             "mode": 4,
  //             "material": 30
  //         },
  //         {
  //             "attributes": {
  //                 "NORMAL": 94,
  //                 "POSITION": 95
  //             },
  //             "indices": 93,
  //             "mode": 4,
  //             "material": 31
  //         }
  //     ],
  //     "name": "technic_driver_arm_joint_p_SOLIDS_5"
  // },
    let gltf:Gltf;
    let meshA;
    before(function () {
      return WebGltfIO.loadGltf(path).then( res=>{
        gltf=res 
        meshA = gltf.getElementByName( GltfTypes.MESH, 'technic_driver_arm_joint_p_SOLIDS_5' );
      })

    });



    it("meshA has primitives", function () {
      expect( meshA.primitives ).to.be.ok()
    });

    it("meshA has 2 primitives", function () {
      expect( meshA.primitives.length ).to.be(2)
    });

    it("primitives mode is ok", function () {
      expect( meshA.primitives[0].mode ).to.be(4)
      expect( meshA.primitives[1].mode ).to.be(4)
    });




    it("primitive 0 has position", function () {
      expect( meshA.primitives[0].attributes.getSemantic( 'POSITION' ) ).to.be.ok()
    });

    it("primitive 0 has normal", function () {
      expect( meshA.primitives[0].attributes.getSemantic( 'NORMAL' ) ).to.be.ok()
    });

    it("primitive 0 has 2 attribs", function () {
      expect( meshA.primitives[0].attributes.length ).to.be(2)
    });


    it("primitive 0 position has correct accessor", function () {
      const pos = meshA.primitives[0].attributes.getSemantic( 'POSITION' );
      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 92 );
      expect( pos.accessor ).to.be(accessor)
    });



    it("primitive 1 has position", function () {
      expect( meshA.primitives[1].attributes.getSemantic( 'POSITION' ) ).to.be.ok()
    });

    it("primitive 1 has normal", function () {
      expect( meshA.primitives[1].attributes.getSemantic( 'NORMAL' ) ).to.be.ok()
    });

    it("primitive 1 has 2 attribs", function () {
      expect( meshA.primitives[1].attributes.length ).to.be(2)
    });


    it("primitive 1 position has correct accessor", function () {
      const pos = meshA.primitives[1].attributes.getSemantic( 'POSITION' );
      const accessor = gltf.getElement( GltfTypes.ACCESSOR, 95 );
      expect( pos.accessor ).to.be(accessor)
    });





    it("primitives has indices", function () {
      expect( meshA.primitives[0].indices ).to.be.ok()
      expect( meshA.primitives[1].indices ).to.be.ok()

      let accessor;

      accessor = gltf.getElement( GltfTypes.ACCESSOR, 90 );
      expect( meshA.primitives[0].indices ).to.be( accessor )
      accessor = gltf.getElement( GltfTypes.ACCESSOR, 93 );
      expect( meshA.primitives[1].indices ).to.be( accessor )
    });

    
  });

});