import { describeMulti } from "./test-utils";
import Gltf from "../src/Gltf";
import WebGltfIO from '../src/io/web';
import GltfTypes from "../src/types/GltfTypes";
import { GLContext } from "nanogl/types";
import { createContext, destroyContext } from "./glcontext-utils";

const enum GL_FILTER {
  NEAREST                = 9728,
  LINEAR                 = 9729,
  NEAREST_MIPMAP_NEAREST = 9984,
  LINEAR_MIPMAP_NEAREST  = 9985,
  NEAREST_MIPMAP_LINEAR  = 9986,
  LINEAR_MIPMAP_LINEAR   = 9987,
}

describe("Texture", function () {

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
    let gl : GLContext;
  
    before(function () {
      gl = createContext();
      return WebGltfIO.loadGltf(path).then( res=>{
        gltf=res 
        return gltf.allocate( gl );
      })
    });


    after( function(){
      destroyContext( gl );
    })

  

  //   "attributes": {
  //     "NORMAL": 1,
  //     "POSITION": 2
  // },
  // "indices": 0,
  // "mode": 4,
  // "material": 0


    it("gltf has gl texture created", function () {
      let m = gltf.getElement( GltfTypes.TEXTURE, 0 );
      expect( m.glTexture ).to.be.ok()
    });
    

    it("gltf has gl texture allocated", function () {
      let m = gltf.getElement( GltfTypes.TEXTURE, 0 );
      expect( m.glTexture.id ).to.be.ok()
    });

    it("gltf has gl texture correct size", function () {
      let m = gltf.getElement( GltfTypes.TEXTURE, 0 );
      expect( m.glTexture.width ).to.be(1024)
    });
    
  
  });
    

});

