import Gltf from '../src'
import expect from 'expect.js'
import { ElementType } from '../src/consts';
import Node from '../src/elements/Node';
import { expectEqualArray } from './test-utils';
import WebGltfIO from '../src/io/web';


describe("Node graph", function () {

  
  
  
  describe("no transform", function () {
    
    let gltf:Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Node_Attribute/Node_Attribute_00.gltf').then( res=>gltf=res )
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