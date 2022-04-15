import Gltf from '../src/Gltf'
import expect from 'expect.js'
import Node from '../src/elements/Node';
import { expectEqualArray } from './test-utils';
import Animation from '../src/elements/Animation';
import WebGltfIO from '../src/io/web';
import GltfTypes from '../src/types/GltfTypes';


describe("Node transform", function () {

  
  
  
  describe("translate anim", function () {
    
    let gltf : Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Animation_Node/Animation_Node_00.gltf').then( res=>gltf=res )
    });

    it("evaluate t0", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( 0 );
      expectEqualArray( m.position, new Float32Array( [
        -.1, 0, 0,
       ] ));

    });
 
    it("evaluate t1", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( 1 );
      expectEqualArray( m.position, new Float32Array( [
        .1, 0, 0,
       ] ));

    });
 
    it("evaluate t2", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( 2 );
      expectEqualArray( m.position, new Float32Array( [
        -.1, 0, 0,
       ] ));

    });


    it("evaluate t-1", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( -1 );
      expectEqualArray( m.position, new Float32Array( [
        -.1, 0, 0,
       ] ));

    });

    it("evaluate t+3", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( 3 );
      expectEqualArray( m.position, new Float32Array( [
        -.1, 0, 0,
       ] ));

    });

    
  });
  
  
  // /accessors/5
  // [0.00000, 0.70711, 0.00000, 0.70711]
  // [0.00000, 0.00000, 0.00000, 1.00000]
  // [0.00000, -0.70711, 0.00000, 0.70711]
  // [0.00000, 0.00000, 0.00000, 1.00000]
  // [0.00000, 0.70711, 0.00000, 0.70711]
  
  describe("rotation anim", function () {
    
    const SIN45 = Math.sin( Math.PI/4 )
    let gltf : Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Animation_Node/Animation_Node_01.gltf').then( res=>gltf=res )
    });

    it("evaluate t-10", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( -10 );
      expectEqualArray( m.rotation, new Float32Array( [0.00000, SIN45, 0.00000, SIN45] ));

    });


    it("evaluate t0", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( 0 );
      expectEqualArray( m.rotation, new Float32Array( [0.00000, SIN45, 0.00000, SIN45] ));

    });

    it("evaluate t1", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( 1 );
      expectEqualArray( m.rotation, new Float32Array( [0.00000, 0.00000, 0.00000, 1.00000] ));

    });

    it("evaluate t2", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( 2 );
      expectEqualArray( m.rotation, new Float32Array( [0.00000, -SIN45, 0.00000, SIN45] ));

    });

    it("evaluate t10", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( 10 );
      expectEqualArray( m.rotation, new Float32Array( [0.00000, SIN45, 0.00000, SIN45] ));

    });

  });
  

  describe("scale anim", function () {
    
    let gltf : Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Animation_Node/Animation_Node_02.gltf').then( res=>gltf=res )
    });

    it("evaluate t-10", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( -10 );
      expectEqualArray( m.scale, new Float32Array( [.8, .8, .8] ));

    });


    it("evaluate t0", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( 0 );
      expectEqualArray( m.scale, new Float32Array( [.8, .8, .8] ));

    });

    it("evaluate t1", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim.evaluate( 1 );
      expectEqualArray( m.scale, new Float32Array( [1.2, 1.2, 1.2] ));

    });

    it("evaluate t2", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      anim.evaluate( 2 );
      expectEqualArray( m.scale, new Float32Array( [.8, .8, .8] ));
    });

    it("evaluate t10", function () {
      const anim = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      anim.evaluate( 10 );
      expectEqualArray( m.scale, new Float32Array( [.8, .8, .8] ));
    });

  });
  

  describe("multiple anim", function () {
    
    const SIN45 = Math.sin( Math.PI/4 )
    let gltf : Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Animation_NodeMisc/Animation_NodeMisc_07.gltf').then( res=>gltf=res )
    });

    it("evaluate t-10", function () {
      const anim0 = gltf.getElement( GltfTypes.ANIMATION, 0 );
      const anim1 = gltf.getElement( GltfTypes.ANIMATION, 1 );
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      
      anim0.evaluate( 2 );
      anim1.evaluate( 2 );
      expectEqualArray( m.rotation, new Float32Array( [0.00000, -SIN45, 0.00000, SIN45] ));
      expectEqualArray( m.position, new Float32Array( [.1, 0, 0] ));

    });


  });
  
  
  
});