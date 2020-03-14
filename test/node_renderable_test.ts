import Gltf from '../src'
import expect from 'expect.js'
import WebGltfIO from '../src/io/web';
import GltfTypes from '../src/types/GltfTypes';
import { GLContext } from 'nanogl/types';
import { createContext, destroyContext } from './glcontext-utils';


describe("Node renderable", function () {

  
  
  
  describe("nodes with mesh have renderables", function () {
    
    let gltf:Gltf;
  
    before(function () {
    });
    
    let gl : GLContext;
    
    before(function () {
      gl = createContext();
      return WebGltfIO.loadGltf('samples/generator/Output/Node_Attribute/Node_Attribute_00.gltf').then( res=>{
        gltf=res 
        return gltf.allocateGl( gl );
      })
    });


    after( function(){
      destroyContext( gl );
    })


    it("renderables are defined", function () {
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      expect( m.renderable ).to.be.ok()
    });

    it("renderables are set on gltf object", function () {
      const m = gltf.getElement( GltfTypes.NODE, 0 );
      expect( gltf.renderables[0] ).to.be.equal( m.renderable )
      expect( gltf.renderables.length ).to.be.equal( 2 )
    });


  });

  
});