import Gltf from '../src/Gltf'
import expect from 'expect.js'
import WebGltfIO from '../src/io/web';
import GltfTypes from '../src/types/GltfTypes';
import { GLContext } from 'nanogl/types';
import { createContext, destroyContext } from './glcontext-utils';


describe("Node renderable", function () {

  
  
  
  describe("nodes with mesh have renderables", function () {
    
    let gltf:Gltf;    
    let gl : GLContext;
    
    before(function () {
      gl = createContext();
      return WebGltfIO.loadGltf('samples/generator/Output/Node_Attribute/Node_Attribute_00.gltf').then( res=>{
        gltf=res 
        return gltf.allocate( gl );
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
      expect( gltf.renderables.length ).to.be.equal( 2 )
    });


  });

  describe("primitives with no material shoul have default one", function () {
    
    let gltf:Gltf;    
    let gl : GLContext;
    
    before(function () {
      gl = createContext();
      return WebGltfIO.loadGltf('samples/models/2.0/Triangle/glTF/Triangle.gltf').then( res=>{
        gltf=res 
        return gltf.allocate( gl );
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
      expect( gltf.renderables.length ).to.be.equal( 1 )
    });


  });

  
});