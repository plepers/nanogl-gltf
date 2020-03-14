import Gltf from '../src'
import expect from 'expect.js'
import WebGltfIO from '../src/io/web';
import StandardPass from '../src/glsl/StandardPass';
import MaterialOverrideExtension from '../src/extensions/MaterialOverrideExtension';
import GltfTypes from '../src/types/GltfTypes';


describe("MaterialOverrideExtension", function () {

  let gltf : Gltf;//= new Gltf();
  let pass : StandardPass;


  before(function () {

    pass = new StandardPass();
    const overrides = new MaterialOverrideExtension()
    overrides.overrides = {
      'TextureClampMaterialT' : pass
    }

    return WebGltfIO.loadGltf( 'samples/models/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf', {
      extensions : [overrides]
    } ).then( (res)=>gltf=res )
  });
  


  it("override mat should be ok", function () {
    let mat = gltf.getElementByName( GltfTypes.MATERIAL, 'TextureClampMaterialT' )
    expect( mat ).to.be.ok()
  })

  it("should override", function () {
    
    let mat = gltf.getElementByName( GltfTypes.MATERIAL, 'TextureClampMaterialT' )
    expect( mat.materialPass === pass ).to.be.equal(true);

  });


  it("should let other ok", function () {
    let mat = gltf.getElementByName( GltfTypes.MATERIAL, 'BackgroundMaterial' )
    expect( mat ).to.be.ok()
  });

  it("should let other passes ok", function () {
    let mat = gltf.getElementByName( GltfTypes.MATERIAL, 'BackgroundMaterial' )
    expect( mat.materialPass ).to.be.ok()
    expect( mat.materialPass ).not.to.be.equal(pass);
  });







});
