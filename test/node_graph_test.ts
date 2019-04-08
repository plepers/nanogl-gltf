import Gltf from '../src'
import expect from 'expect.js'
import { ElementType } from '../src/consts';
import Node from '../src/elements/Node';
import { expectEqualArray } from './test-utils';


describe("Node graph", function () {

  
  
  
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
  
});