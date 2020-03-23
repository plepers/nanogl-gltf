#pragma SLOT version
#pragma SLOT definitions
#pragma SLOT precision


#if __VERSION__ == 300
  #define IN in
  #define OUT out
#else
  #define IN attribute
  #define OUT varying
#endif


#pragma SLOT pv


IN vec3 aPosition;
IN vec3 aNormal;
IN vec4 aTangent;


uniform mat4 uMVP;
uniform mat4 uWorldMatrix;
uniform mat4 uVP;


OUT vec3 vWorldPosition;
OUT mediump vec3 vWorldNormal;
OUT mediump vec3 vWorldTangent;


#if HAS_normal
  #ifndef useDerivatives
  OUT mediump vec3 vWorldBitangent;
  #endif
#endif


#if perVertexIrrad
  OUT vec3 vIrradiance;
  uniform vec4 uSHCoeffs[7];
  #include "./includes/sh.glsl"
#endif




vec3 rotate( mat4 m, vec3 v )
{
  return m[0].xyz*v.x + m[1].xyz*v.y + m[2].xyz*v.z;
}



void main( void ){

  #pragma SLOT v

  // warp acces
  highp vec3 position = aPosition;
  vec3 normal = aNormal;
  vec3 tangent = aTangent.xyz;
  mat4 worldMatrix = uWorldMatrix;
  mat4 mvp         = uMVP;

  #pragma SLOT vertex_warp

  vec4 worldPos = worldMatrix * vec4( position, 1.0 );
  worldPos.xyz /= worldPos.w;
  worldPos.w = 1.0;

  #pragma SLOT vertex_warp_world

  gl_Position     = uVP         * worldPos;

  vWorldPosition  = worldPos.xyz;
  vWorldNormal    = normalize( rotate( worldMatrix, normal ) );
  vWorldTangent   = normalize( rotate( worldMatrix, tangent.xyz ) );

  #if HAS_normal
    #ifndef useDerivatives
    vWorldBitangent = normalize( cross( vWorldNormal, vWorldTangent ) * aTangent.w );
    #endif
  #endif

  #if perVertexIrrad
    vIrradiance = SampleSH( vWorldNormal, uSHCoeffs );
  #endif


  
  // vDebugColor = vec4( -position, 1.0 );
}