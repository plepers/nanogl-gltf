import expect from 'expect.js'
import {DefaultSemantics} from '../src/Semantics'

describe("Semantics", function () {

    let semantics;
    before( function(){
        semantics = new DefaultSemantics();
    })
    
    describe("getAttributeName", function () {
  
  
        it("POSITION", function () {
            expect( semantics.getAttributeName("POSITION") ).to.be( 'aPosition' )
        });

        it("NORMAL", function () {
            expect( semantics.getAttributeName("NORMAL") ).to.be( 'aNormal' )
        });

        it("NORMAL_0", function () {
            expect( semantics.getAttributeName("NORMAL_0") ).to.be( 'aNormal' )
        });

        it("NORMAL_3", function () {
            expect( semantics.getAttributeName("NORMAL_3") ).to.be( 'aNormal3' )
        });

        it("NORMAL_13", function () {
            expect( semantics.getAttributeName("NORMAL_13") ).to.be( 'aNormal13' )
        });

        it("TEXCOORD", function () {
            expect( semantics.getAttributeName("TEXCOORD") ).to.be( 'aTexCoord0' )
        });

        it("TEXCOORD_0", function () {
            expect( semantics.getAttributeName("TEXCOORD_0") ).to.be( 'aTexCoord0' )
        });

        it("TEXCOORD_1", function () {
            expect( semantics.getAttributeName("TEXCOORD_1") ).to.be( 'aTexCoord1' )
        });


    });
});