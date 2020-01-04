
#ifndef _H_SAMPLE_SH_
#define _H_SAMPLE_SH_
// ================================
// compute Spherical Harmonics
// ================================
//
// "Stupid Spherical Harmonics (SH) Tricks"
// http://www.ppsloan.org/publications/StupidSH36.pdf
//
//
vec3 SampleSH( vec3 N, vec4 sh[7] )
{
  N.xz = N.zx;
  vec4 NV = vec4(N, 1.0);

  // todo transpose coeffs directly
  // NV.xyz = NV.zyx;

  vec3 X0, X1, X2;
  X0.x = dot( sh[0].xyz, N) + sh[0].w;
  X0.y = dot( sh[1].xyz, N) + sh[1].w;
  X0.z = dot( sh[2].xyz, N) + sh[2].w;

  vec4 vB = NV.zyxx * NV.yxxz;
  X1.x = dot( sh[3].xyz, vB.xyz) + (sh[3].w * vB.w);
  X1.y = dot( sh[4].xyz, vB.xyz) + (sh[4].w * vB.w);
  X1.z = dot( sh[5].xyz, vB.xyz) + (sh[5].w * vB.w);

  float vC = NV.z * NV.z - NV.y * NV.y;
  X2 =  sh[6].xyz * vC;

  return ( X0 + X1 + X2 );
//  return max( vec3(0.0) , X0 + X1 + X2 );
}

#endif
