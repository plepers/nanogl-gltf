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
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
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
      const m = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      m.updateWorldMatrix();
      expectEqualArray( m._wposition, new Float32Array( [-2,2,-2] ));
    });


    it("child has parent", function () {
      const child = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      const parent = gltf.getElementByName( GltfTypes.NODE, 'Node0' );
      
      expect( child._parent).to.be( parent );
    });


    it("parent has children", function () {
      const child = gltf.getElementByName( GltfTypes.NODE, 'Node1' );
      const parent = gltf.getElementByName( GltfTypes.NODE, 'Node0' );
      
      expect( parent._parent).to.be( null );
      expect( parent._children.length).to.be( 1 );
      expect( parent._children[0]).to.be( child );
    });


  });


    
  describe("find", function () {
    
    let gltf:Gltf;
  
    before(function () {
      return WebGltfIO.loadGltf('samples/models/2.0/Buggy/glTF/Buggy.gltf').then( res=>gltf=res )
    });


    function logGraph( node : Node, tabs:string ){
      console.log( tabs+node.name);
      for (const c of node._children) {
        logGraph( c as Node, tabs+'  ')
      }
    }

    it("should find child when mesh has name", function () {
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      expect( m.findChild("body_11") ).to.be.ok()
    });
    
    it("should find descendant when mesh has name", function () {
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      // logGraph(m, '');
      expect( m.findDescendant("tech_light_p_SOLIDS_3") ).to.be.ok()
    });




  });
  
});