#pragma SLOT version
#pragma SLOT definitions

#if __VERSION__ != 300
#ifdef useDerivatives
  #extension GL_OES_standard_derivatives : enable
#endif 
#endif 

#pragma SLOT precision

#if __VERSION__ == 300
  #define IN in
  #define texture2D(a,b) texture( a, b )
#else
  #define IN varying
  #define FragColor gl_FragColor
#endif



#if __VERSION__ == 300
  out vec4 FragColor;
#endif

#pragma SLOT pf


uniform vec3 uCameraPosition;

IN vec3 vWorldPosition;
IN mediump vec3 vWorldNormal;
IN mediump vec3 vWorldTangent;

#if HAS_normal
#ifndef useDerivatives
  IN mediump vec3 vWorldBitangent;
#endif
#endif


// IBL
// ========
uniform sampler2D tEnv;

#if perVertexIrrad
  IN vec3 vIrradiance;
#else
  uniform vec4 uSHCoeffs[7];
  #include "./includes/sh.glsl"
#endif



// MATH
// =========
#define saturate(x) clamp( x, 0.0, 1.0 )
#define sdot( a, b ) saturate( dot(a,b) )



#include "nanogl-pbr/glsl/includes/ibl.glsl"
#include "./includes/perturb-normal.glsl"
#include "./includes/tonemap.glsl"


// Schlick approx
// [Schlick 1994, "An Inexpensive BRDF Model for Physically-Based Rendering"]
// https://github.com/EpicGames/UnrealEngine/blob/dff3c48be101bb9f84633a733ef79c91c38d9542/Engine/Shaders/BRDF.usf#L168
vec3 F_Schlick( float VoH,vec3 spec,float glo )
{
  float dot = glo*glo * pow( 1.0-VoH, 5.0 );
  return( 1.0 - dot )*spec + dot;
}




#if HAS_normal
  #if HAS_normalScale
    #define SCALED_NORMAL(k) GetScaledNormal( normal(), normalScale() )
    vec3 GetScaledNormal( vec3 nrmtex, float scale ){
      vec3 nrm = nrmtex = nrmtex*vec3(2.0) - vec3(1.0);
      return normalize( nrm * vec3(scale, scale, 1.0 ) );
    }
  #else
    #define SCALED_NORMAL(k) GetScaledNormal( normal() )
    vec3 GetScaledNormal( vec3 nrmtex ){
      return nrmtex = nrmtex*vec3(2.0) - vec3(1.0);
    }
  #endif
  
  
  #define COMPUTE_NORMAL(k) ComputeWorldNormal( SCALED_NORMAL() )
  vec3 ComputeWorldNormal( vec3 nrmmap ){
    
    vec3 nrm = normalize( gl_FrontFacing ? vWorldNormal : -vWorldNormal );
    #ifndef useDerivatives
      vec3 res = normalize( perturbWorldNormal( nrm, nrmmap, vWorldTangent, vWorldBitangent ) );
    #else
      vec3 res = normalize( perturbWorldNormalDerivatives( nrm, nrmmap, normal_texCoord() ) );
    #endif
    // res = res * 0.0001 + vWorldNormal;

    return res;
  }

#else
  #define COMPUTE_NORMAL(k) ComputeWorldNormal( )
  vec3 ComputeWorldNormal(){
    return normalize( gl_FrontFacing ? vWorldNormal : -vWorldNormal );
  }
#endif



vec3 ComputeIBLDiffuse( vec3 worldNormal ){
  #if perVertexIrrad
    return vIrradiance;
  #else
    return SampleSH(worldNormal, uSHCoeffs );
  #endif
}


//                MAIN
// ===================

void main( void ){

  #pragma SLOT f

  vec3 _baseColor = vec3(1.0);
  #if HAS_baseColor
    _baseColor *= baseColor();
  #endif
  #if HAS_baseColorFactor
    _baseColor *= baseColorFactor();
  #endif
  
  #ifdef HAS_vertexColor
  #if HAS_vertexColor
    _baseColor *= vertexColor();
  #endif
  #endif


  float _metalness = 1.0;
  #if HAS_metalnessFactor
    _metalness *= metalnessFactor();
  #endif
  #if HAS_metalness
    _metalness *= metalness();
  #endif


  float _roughness = 1.0;
  #if HAS_roughnessFactor
    _roughness *= roughnessFactor();
  #endif
  #if HAS_roughness
    _roughness *= roughness();
  #endif



  // -----------
  vec3 worldNormal = COMPUTE_NORMAL();



  // SH Irradiance diffuse coeff
  // -------------

  vec3 diffuseCoef = ComputeIBLDiffuse( worldNormal );


  // IBL reflexion
  // --------------

  vec3 viewDir = normalize( uCameraPosition - vWorldPosition );
  vec3 worldReflect = reflect( -viewDir, worldNormal );
  vec3 specularColor = SpecularIBL( tEnv, worldReflect, _roughness );


  #pragma SLOT lightsf




  float NoV = sdot( viewDir, worldNormal );
  vec3 specularF0 = mix( vec3(0.04), _baseColor, _metalness );
  specularColor *= F_Schlick( NoV, specularF0, 1.0-_roughness );


  
	#if horizonFading
    float horiz = dot( worldReflect, vWorldNormal );
    horiz = saturate( 1.0 + horiz );
    horiz *= horiz;
    specularColor *= horiz;
  #endif



  #if HAS_occlusion
    float _occlusion = occlusion();
    #if HAS_occlusionStrength
      _occlusion = 1.0 - occlusionStrength() + _occlusion*occlusionStrength();
    #endif
    diffuseCoef *= _occlusion;
  #endif


  vec3 alb = mix( _baseColor * vec3(1.0-0.04), vec3(0.0), _metalness );
  vec3 albedoSq = alb*alb;

  FragColor.xyz = diffuseCoef*albedoSq + specularColor;


  vec3 _emissive = vec3(0.0);
  #if HAS_emissive 
    _emissive += emissive();
  #endif
  #if HAS_emissiveFactor
    _emissive *= emissiveFactor();
  #endif
  
  FragColor.xyz += _emissive;



  float _alpha = 1.0;
  #if HAS_alpha
    _alpha *= alpha();
  #endif
  #if HAS_alphaFactor
    _alpha *= alphaFactor();
  #endif


  #if alphaMode( MASK )
    if( _alpha < alphaCutoff() ) discard;
    FragColor.a = 1.0;
  #elif alphaMode( BLEND )
    FragColor.a = _alpha;
  #else
    FragColor.a = 1.0;
  #endif



  EXPOSURE(FragColor.rgb);
  GAMMA_CORRECTION(FragColor.rgb);



  #pragma SLOT post_color

  // FragColor.rgb = FragColor.rgb*0.0001 + gloss();
  // FragColor.rgb = FragColor.rgb*0.0001 + specular();
  // FragColor.rgb = FragColor.rgb*0.0001 + specularColor;
  // FragColor.rgb = FragColor.rgb*0.0001 + albedo();
  // FragColor.rgb = FragColor.rgb*0.0001 + albedoSq;
  // FragColor.rgb = FragColor.rgb*0.0001 + diffuseCoef;
  // FragColor.rgb = FragColor.rgb*0.0001 + worldNormal;
  // FragColor.rgb = FragColor.rgb*0.0001 + vWorldNormal;
  // FragColor.rgb = FragColor.rgb*0.0001 + vWorldBitangent;
  // FragColor.rgb = FragColor.rgb*0.0001 + vWorldTangent;
  // FragColor.rgb = FragColor.rgb*0.0001 + vec3(1.0, 0.0, 0.0);
  // FragColor.rg = vec2(0.0);

  // pure mirror

  // vec3 _rr = reflect( -viewDir, vWorldNormal );
  // vec3 purerefl = SpecularIBL( tEnv, _rr, 0.0 );
  // FragColor.rgb = FragColor.rgb*0.0001 + purerefl;

  #if HAS_normal
  // FragColor.rgb = FragColor.rgb*0.0001 + normal();
  #endif

  #if HAS_occlusion
    // FragColor.rgb = FragColor.rgb*0.0001 + occlusion();
  #endif


  // #ifdef HAS_GI
  // #if HAS_GI
  //   FragColor.rgb = FragColor.rgb*0.0001 + gi;
  // #endif
  // #endif

}