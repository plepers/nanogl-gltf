import Gltf from '../src/Gltf'
import expect from 'expect.js'
import WebGltfIO from '../src/io/web';
import MaterialOverrideExtension from '../src/extensions/MaterialOverrideExtension';
import GltfTypes from '../src/types/GltfTypes';
import BaseMaterial from 'nanogl-pbr/Material';
import { GLContext } from 'nanogl/types';
import {createContext, destroyContext} from './glcontext-utils'
import MeshRenderer from '../src/renderer/MeshRenderer';
import Material from '../src/elements/Material';

describe("MaterialOverrideExtension", function () {

  let gltf : Gltf;//= new Gltf();
  let material : BaseMaterial;
  let gl : GLContext;

  before(function () {

    gl = createContext();
    material = new BaseMaterial(gl);
    const overrides = new MaterialOverrideExtension()
    overrides.overrideMaterial('TextureClampMaterialT' , material )

    return WebGltfIO.loadGltf( 'samples/models/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf', {
      extensions : [overrides]
    } ).then( (res)=>{
      gltf=res;
      return res.allocate(gl)
     } )
  });

  after( function(){
    destroyContext( gl );
  })
  


  it("override mat should be ok", function () {
    let mat = gltf.getElementByName( GltfTypes.MATERIAL, 'TextureClampMaterialT' )
    expect( mat ).to.be.ok()
  })

  it("should override", function () {
    
    let node = gltf.getElement( GltfTypes.NODE, 4 );
    expect(node.renderable).to.be.ok()
    var renderable = node.renderable as MeshRenderer
    expect( renderable.materials.length ).to.be.equal(1)
    expect( renderable.materials[0] === material ).to.be.equal(true);

  });


  it("should let other ok", function () {
    let mat = gltf.getElementByName( GltfTypes.MATERIAL, 'BackgroundMaterial' )
    expect( mat ).to.be.ok()
  });

  it("should let other passes ok", function () {
    let mat : Material = gltf.getElementByName( GltfTypes.MATERIAL, 'BackgroundMaterial' ) as Material
    expect( mat.materialPass ).to.be.ok()
  });







});
