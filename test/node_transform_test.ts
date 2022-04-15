import Gltf from '../src/Gltf'
import expect from 'expect.js'
import Node from '../src/elements/Node';
import { expectEqualArray } from './test-utils';
import WebGltfIO from '../src/io/web';
import GltfTypes from '../src/types/GltfTypes';


describe("Node transform", function () {

  
  
  
  describe("no transform", function () {
    
    let gltf : Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf( 'samples/generator/Output/Node_Attribute/Node_Attribute_00.gltf').then( (res)=>gltf=res )
    });

    it("matrix ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m._matrix, new Float32Array( [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
       ] ));
    });


  });
  
  
  describe("translation xyz only", function () {
    
    let gltf : Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Node_Attribute/Node_Attribute_01.gltf').then( (res)=>gltf=res )
    });

    it("position ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.position, new Float32Array( [
        -2, 2, -2
      ]));
    });

    it("scale ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.scale, new Float32Array( [
        1,1,1
      ]));
    });

    it("rotation ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.rotation, new Float32Array( [
        0,0,0,1
      ]));
    });

  });
  
  
  describe("rotation only Y", function () {
    
    let gltf : Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Node_Attribute/Node_Attribute_05.gltf').then( res=>gltf=res )
    });

    it("position ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.position, new Float32Array( [
        0,0,0
      ]));
    });

    it("scale ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.scale, new Float32Array( [
        1,1,1
      ]));
    });

    it("rotation ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.rotation, new Float32Array( [
        0,1,0,0
      ]));
    });

  });
  
  describe("scale only uniform", function () {
    
    let gltf : Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Node_Attribute/Node_Attribute_06.gltf').then( res=>gltf=res )
    });

    it("position ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.position, new Float32Array( [
        0,0,0
      ]));
    });

    it("scale ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.scale, new Float32Array( [
        1.2,1.2,1.2
      ]));
    });

    it("rotation ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.rotation, new Float32Array( [
        0,0,0,1
      ]));
    });

  });
  
  describe("all TRS", function () {
    
    let gltf : Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Node_Attribute/Node_Attribute_07.gltf').then( res=>gltf=res )
    });

    it("position ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.position, new Float32Array( [
        -2,2,-2
      ]));
    });

    it("scale ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.scale, new Float32Array( [
        1.2,1.2,1.2
      ]));
    });

    it("rotation ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.rotation, new Float32Array( [
        0,1,0,0
      ]));
    });

  });


   
  describe("all TRS from matrix", function () {
    
    let gltf : Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Node_Attribute/Node_Attribute_08.gltf').then( res=>gltf=res )
    });

    it("position ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.position, new Float32Array( [
        -2,2,-2
      ]));
    });

    it("scale ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.scale, new Float32Array( [
        1.2,1.2,1.2
      ]));
    });

    it("rotation ok", function () {
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m.rotation, new Float32Array( [
        0,1,0,0
      ]));
    });

  });
});