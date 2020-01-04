import standardFrag from '../src/glsl/standard.frag';

import expect from 'expect.js'


describe( "module", function(){

  it( "is ok", function(){
    expect( standardFrag ).to.be.ok( );
  })

  it( "is function", function(){
    expect( standardFrag ).to.be.a( Function );
  })

});

