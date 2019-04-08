import Gltf from '../src'
import expect from 'expect.js'
import { ElementType } from '../src/consts';
import Node from '../src/elements/Node';
import { expectEqualArray } from './test-utils';


describe("Node transform", function () {

  
  
  
  describe("no transform", function () {
    
    const gltf= new Gltf();
  
    before(function () {
      return gltf.load('samples/generator/Output/Node_Attribute/Node_Attribute_00.gltf')
    });

    it("matrix ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m._matrix, new Float32Array( [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
       ] ));
    });


  });
  
  
  describe("translation xyz only", function () {
    
    const gltf= new Gltf();
  
    before(function () {
      return gltf.load('samples/generator/Output/Node_Attribute/Node_Attribute_01.gltf')
    });

    it("position ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.position, new Float32Array( [
        -2, 2, -2
      ]));
    });

    it("scale ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.scale, new Float32Array( [
        1,1,1
      ]));
    });

    it("rotation ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.rotation, new Float32Array( [
        0,0,0,1
      ]));
    });

  });
  
  
  describe("rotation only Y", function () {
    
    const gltf= new Gltf();
  
    before(function () {
      return gltf.load('samples/generator/Output/Node_Attribute/Node_Attribute_05.gltf')
    });

    it("position ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.position, new Float32Array( [
        0,0,0
      ]));
    });

    it("scale ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.scale, new Float32Array( [
        1,1,1
      ]));
    });

    it("rotation ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.rotation, new Float32Array( [
        0,1,0,0
      ]));
    });

  });
  
  describe("scale only uniform", function () {
    
    const gltf= new Gltf();
  
    before(function () {
      return gltf.load('samples/generator/Output/Node_Attribute/Node_Attribute_06.gltf')
    });

    it("position ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.position, new Float32Array( [
        0,0,0
      ]));
    });

    it("scale ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.scale, new Float32Array( [
        1.2,1.2,1.2
      ]));
    });

    it("rotation ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.rotation, new Float32Array( [
        0,0,0,1
      ]));
    });

  });
  
  describe("all TRS", function () {
    
    const gltf= new Gltf();
  
    before(function () {
      return gltf.load('samples/generator/Output/Node_Attribute/Node_Attribute_07.gltf')
    });

    it("position ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.position, new Float32Array( [
        -2,2,-2
      ]));
    });

    it("scale ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.scale, new Float32Array( [
        1.2,1.2,1.2
      ]));
    });

    it("rotation ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.rotation, new Float32Array( [
        0,1,0,0
      ]));
    });

  });


   
  describe("all TRS from matrix", function () {
    
    const gltf= new Gltf();
  
    before(function () {
      return gltf.load('samples/generator/Output/Node_Attribute/Node_Attribute_08.gltf')
    });

    it("position ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.position, new Float32Array( [
        -2,2,-2
      ]));
    });

    it("scale ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.scale, new Float32Array( [
        1.2,1.2,1.2
      ]));
    });

    it("rotation ok", function () {
      const m = gltf.getElementByName<Node>( ElementType.NODE, 'Node1' );
      expectEqualArray( m.rotation, new Float32Array( [
        0,1,0,0
      ]));
    });

  });
});