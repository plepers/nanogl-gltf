


function fn( obj )
{
  let __p = '';

  __p+=`
#ifndef _H_DECODE_RGBE_
#define _H_DECODE_RGBE_

vec3 decodeRGBE( vec4 hdr ){
  return hdr.rgb * exp2( (hdr.a*255.0)-128.0 );
  // return hdr.rgb * pow( 2.0, (hdr.a*255.0)-128.0 );
}

#endif`;


  return __p;
}

fn.toString = fn;

export default fn;
