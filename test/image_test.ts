import Gltf from '../src'
import expect from 'expect.js'
import { expectEqualArray, describeMulti } from './test-utils';
import WebGltfIO from '../src/io/web';
import Mesh from '../src/elements/Mesh';
import Accessor from '../src/elements/Accessor';
import GltfTypes from '../src/types/GltfTypes';


describe("Image", function () {

  describeMulti( describe, 
    [{
      title : "data-uri embeded",
      data : "samples/models/2.0/MultiUVTest/glTF-Embedded/MultiUVTest.gltf"
    },{
      title : "glb",
      data : 'samples/models/2.0/MultiUVTest/glTF-Binary/MultiUVTest.glb'
    },{
      title : "external uri",
      data : 'samples/models/2.0/MultiUVTest/glTF/MultiUVTest.gltf'
    }], 
    function ( path:string ) {
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


    it("gltf has 2 images", function () {
      let m = gltf.getElement( GltfTypes.IMAGE, 0 );
      expect( m ).to.be.ok()
      m = gltf.getElement( GltfTypes.IMAGE, 1 );
      expect( m ).to.be.ok()
      m = gltf.getElement( GltfTypes.IMAGE, 2 );
      expect( m ).not.to.be.ok()
    });
  

    it("mage sources are ok", function () {
      let m = gltf.getElement( GltfTypes.IMAGE, 0 );
      expect( m.texImageSource ).to.be.ok()
      m = gltf.getElement( GltfTypes.IMAGE, 1 );
      expect( m.texImageSource ).to.be.ok()
    });
  

    it("image 0 has correct size", function () {
      const m = gltf.getElement( GltfTypes.IMAGE, 0 );
      
      expect( m.texImageSource.width ).to.be(1024)
      expect( m.texImageSource.height ).to.be(1024)
    });
  
  });
    

});

