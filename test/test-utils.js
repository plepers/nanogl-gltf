
import expect from 'expect.js'

export function expectEqualArray( v, expected ){
  expect( v.constructor ).to.equal( expected.constructor )
  expect( v.length ).to.equal( expected.length )
  for (let i = 0; i < v.length; i++) {
    if( Math.abs( v[i]-expected[i] ) > 0.000001 )
      expect().fail(`array not equal : ${v[i]} not ${expected[i]} `)
  }
}