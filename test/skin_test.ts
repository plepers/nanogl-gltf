import Gltf from '../src'
import expect from 'expect.js'
import { expectEqualArray, describeMulti } from './test-utils';
import WebGltfIO from '../src/io/web';
import Mesh from '../src/elements/Mesh';
import Accessor from '../src/elements/Accessor';
import GltfTypes from '../src/types/GltfTypes';


describe("Skins", function () {

  
  describeMulti( describe, 
    [{
      title : "rigged simple gltf",
      data : "samples/models/2.0/RiggedSimple/glTF/RiggedSimple.gltf"
    },{
      title : "rigged simple glb",
      data : 'samples/models/2.0/RiggedSimple/glTF-Binary/RiggedSimple.glb'
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


    it(" has skin getter", function () {
      expect( gltf.skins ).to.be.ok()
    });


    it(" has correct number of skins", function () {
      expect( gltf.skins.length ).to.be( 1 )
    });    

    it(" has correct name", function () {
      var skin = gltf.getElement( GltfTypes.SKIN, 0 )
      expect( skin.name ).to.be( "Armature" )
    });    

    
    it(" has correct joints", function () {
      var joints = gltf.getElement( GltfTypes.SKIN, 0 ).joints
      expect( joints.length ).to.be( 2 )
      expect( joints[0].position[2] ).to.be( -4.1803297996521 )
      expect( joints[1].position[1] ).to.be( 4.18717098236084 )
    }); 
    

    it(" has correct inverseBindMatrices", function () {
      var ibms = gltf.getElement( GltfTypes.SKIN, 0 ).inverseBindMatrices
      expect( ibms[0][14] ).to.be( 0.027931740507483482 );
      expect( ibms[1][13] ).to.be( -0.006818830035626888 );
    }); 

    
    it(" has correct skeleton", function () {
      var root = gltf.getElement( GltfTypes.SKIN, 0 ).skeletonRoot
      expect( root.position[2] ).to.be( -4.1803297996521 )
    }); 

  });

});