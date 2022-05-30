import { describeMulti } from "./test-utils";
import Gltf from "../src/Gltf";
import WebGltfIO from '../src/io/web';
import GltfTypes from "../src/types/GltfTypes";
import { filterHasMipmap } from "../src/elements/Image";

const enum GL_FILTER {
  NEAREST                = 9728,
  LINEAR                 = 9729,
  NEAREST_MIPMAP_NEAREST = 9984,
  LINEAR_MIPMAP_NEAREST  = 9985,
  NEAREST_MIPMAP_LINEAR  = 9986,
  LINEAR_MIPMAP_LINEAR   = 9987,
}

describe("Texture", function () {

  describe("utilities", function () {

    it( 'filterHasMipmap', function() {

      expect( filterHasMipmap(GL_FILTER.NEAREST                ) ).to.be(false)
      expect( filterHasMipmap(GL_FILTER.LINEAR                 ) ).to.be(false)
      expect( filterHasMipmap(GL_FILTER.NEAREST_MIPMAP_NEAREST ) ).to.be(true)
      expect( filterHasMipmap(GL_FILTER.LINEAR_MIPMAP_NEAREST  ) ).to.be(true)
      expect( filterHasMipmap(GL_FILTER.NEAREST_MIPMAP_LINEAR  ) ).to.be(true)
      expect( filterHasMipmap(GL_FILTER.LINEAR_MIPMAP_LINEAR   ) ).to.be(true)

    })

  });


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


    it("gltf has 2 textures", function () {
      let m = gltf.getElement( GltfTypes.TEXTURE, 0 );
      expect( m ).to.be.ok()
      m = gltf.getElement( GltfTypes.TEXTURE, 1 );
      expect( m ).to.be.ok()
      m = gltf.getElement( GltfTypes.TEXTURE, 2 );
      expect( m ).not.to.be.ok()
    });
    
    
    it("image sources are ok", function () {
      let m = gltf.getElement( GltfTypes.TEXTURE, 0 );
      expect( m.source.texImageSource ).to.be.ok()
      m = gltf.getElement( GltfTypes.TEXTURE, 1 );
      expect( m.source.texImageSource ).to.be.ok()
    });
  

    it("samplers have default values", function () {
      const m = gltf.getElement( GltfTypes.TEXTURE, 0 );
      expect( m.sampler.magFilter ).to.be( undefined )
      expect( m.sampler.minFilter ).to.be( undefined )
      expect( m.sampler.wrapS ).to.be( 0x2901 )
      expect( m.sampler.wrapT ).to.be( 0x2901 )
    });
  
  });
    

});

