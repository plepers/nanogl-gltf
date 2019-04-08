import Gltf from '../src'
import expect from 'expect.js'


describe( "simple loading", function(){

  it( "should be exported ", function(){

    expect( Gltf ).to.be.ok( );
    
});


describe( "other stuff", function(){
    
    //init
    
    it( "instance create", function(){
        const gltf = new Gltf();
        expect( gltf ).to.be.ok( );
    });

  });

});
