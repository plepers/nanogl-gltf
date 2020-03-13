import Gltf from '../src'
import expect from 'expect.js'
import { expectEqualArray, describeMulti } from './test-utils';
import WebGltfIO from '../src/io/web';
import Mesh from '../src/elements/Mesh';
import Accessor from '../src/elements/Accessor';
import { PROJ_PERSPECTIVE, PROJ_ORTHOGRAPHIC } from '../src/elements/Camera';
import Gltf2 from '../src/types/Gltf2';


describe("Cameras", function () {
  
  let gltf:Gltf;
  
  before(function () {
    return WebGltfIO.loadGltf('samples/models/2.0/Cameras/glTF/Cameras.gltf').then( res=>gltf=res )
  });
  
  
  it(" are defined", function () {
    expect( gltf.cameras ).to.be.ok()
  })

  it(" have 2 cameras", function () {
    expect( gltf.cameras.length ).to.be( 2 )
  });



  
  describe("Prespective", function () {
    

    
    it(" has correct type", function () {
      let cam = gltf.cameras[0];
      expect( cam.type ).to.be( PROJ_PERSPECTIVE )
    });
    
    it(" has proj data", function () {
      let cam = gltf.cameras[0];
      expect( cam.projectionData ).to.be.ok()
    });
    
    
    
    it(" has correct proj data values", function () {
      let cam = gltf.cameras[0];
      let projData = cam.projectionData as Gltf2.ICameraPerspective;
      expect( projData.aspectRatio ).to.be( 1.0  );
      expect( projData.yfov        ).to.be( 0.7  );
      expect( projData.zfar        ).to.be( 100  );
      expect( projData.znear       ).to.be( 0.01 );
      
    });
    
    
    
    it(" has proj matrix", function () {
      let cam = gltf.cameras[0];
      expect( cam.projection ).to.be.ok()
    });
    
    
    it(" has correct proj matrix", function () {
      let cam = gltf.cameras[0];
      //TODO: need more
      expect( cam.projection.length ).to.be( 16 )
    });


  });



  
  describe("Ortographic", function () {
    

    
    it(" has correct type", function () {
      let cam = gltf.cameras[1];
      expect( cam.type ).to.be( PROJ_ORTHOGRAPHIC )
    });
    
    it(" has proj data", function () {
      let cam = gltf.cameras[1];
      expect( cam.projectionData ).to.be.ok()
    });
    
    
    
    it(" has correct proj data values", function () {
      let cam = gltf.cameras[1];
      let projData = cam.projectionData as Gltf2.ICameraOrthographic;
      expect( projData.xmag ).to.be( 1.0 );
      expect( projData.ymag ).to.be( 1.0 );
      expect( projData.zfar ).to.be( 100 );
      expect( projData.znear ).to.be( 0.01 );
      
    });
    
    
    
    it(" has proj matrix", function () {
      let cam = gltf.cameras[1];
      expect( cam.projection ).to.be.ok()
    });
    
    
    it(" has correct proj matrix", function () {
      let cam = gltf.cameras[1];
      //TODO: need more
      expect( cam.projection.length ).to.be( 16 )
    });


  });
});