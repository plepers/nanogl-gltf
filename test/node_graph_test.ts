import Gltf from '../src'
import expect from 'expect.js'
import Node from '../src/elements/Node';
import { expectEqualArray } from './test-utils';
import WebGltfIO from '../src/io/web';
import GltfTypes from '../src/types/GltfTypes';


describe("Node graph", function () {

  
  
  
  describe("no transform", function () {
    
    let gltf:Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Node_Attribute/Node_Attribute_00.gltf').then( res=>gltf=res )
    });

    it("matrix ok", function () {
      const m = gltf.getElementByName<Node>( GltfTypes.NODE, 'Node1' );
      expectEqualArray( m._matrix, new Float32Array( [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
       ] ));
    });


  });
  
  
  
  describe("parent with no transform", function () {
    
    let gltf:Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/generator/Output/Node_Attribute/Node_Attribute_01.gltf').then( res=>gltf=res )
    });

    it("world pos ok", function () {
      const m = gltf.getElementByName<Node>( GltfTypes.NODE, 'Node1' );
      m.updateWorldMatrix();
      expectEqualArray( m._wposition, new Float32Array( [-2,2,-2] ));
    });


    it("child has parent", function () {
      const child = gltf.getElementByName<Node>( GltfTypes.NODE, 'Node1' );
      const parent = gltf.getElementByName<Node>( GltfTypes.NODE, 'Node0' );
      
      expect( child._parent).to.be( parent );
    });


    it("parent has children", function () {
      const child = gltf.getElementByName<Node>( GltfTypes.NODE, 'Node1' );
      const parent = gltf.getElementByName<Node>( GltfTypes.NODE, 'Node0' );
      
      expect( parent._parent).to.be( null );
      expect( parent._children.length).to.be( 1 );
      expect( parent._children[0]).to.be( child );
    });


  });
  
});