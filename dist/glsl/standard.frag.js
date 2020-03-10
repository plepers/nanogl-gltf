
import _INCL_0 from './sh.glsl';
import _INCL_1 from 'nanogl-pbr/glsl/includes/ibl.glsl';
import _INCL_2 from './perturb-normal.glsl';
import _INCL_3 from './tonemap.glsl';


function fn( obj )
{
  let __p = '';

  __p+=`#pragma SLOT version
#pragma SLOT definitions

#if useDerivatives && __VERSION__ != 300
  #extension GL_OES_standard_derivatives : enable
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


#if HAS_normal && useDerivatives == 0
  IN mediump vec3 vWorldTangent;
  IN mediump vec3 vWorldBitangent;
#endif


// IBL
// ========
uniform sampler2D tEnv;

#if perVertexIrrad
  IN vec3 vIrradiance;
#else
  uniform vec4 uSHCoeffs[7];
  ${_INCL_0()}
#endif



// MATH
// =========
#define saturate(x) clamp( x, 0.0, 1.0 )
#define sdot( a, b ) saturate( dot(a,b) )



${_INCL_1()}

${_INCL_2()}
${_INCL_3()}


// Schlick approx
// [Schlick 1994, "An Inexpensive BRDF Model for Physically-Based Rendering"]
// https://github.com/EpicGames/UnrealEngine/blob/dff3c48be101bb9f84633a733ef79c91c38d9542/Engine/Shaders/BRDF.usf#L168
vec3 F_Schlick( float VoH,vec3 spec,float glo )
{
  float dot = glo*glo * pow( 1.0-VoH, 5.0 );
  #if HAS_fresnel
    return( 1.0 - dot )*spec + dot*fresnel();
  #else
    return( 1.0 - dot )*spec + dot;
  #endif
}



#if HAS_normal

  #if HAS_normalDetail
    #define COMPUTE_NORMAL(k) ComputeWorldNormal( normal(), normalDetail() )
    vec3 ComputeWorldNormal( vec3 nrmmap, vec3 nrmmapDetail ){
  #else
    #define COMPUTE_NORMAL(k) ComputeWorldNormal( normal() )
    vec3 ComputeWorldNormal( vec3 nrmmap ){
  #endif
    
    vec3 nrm = normalize( gl_FrontFacing ? vWorldNormal : -vWorldNormal );
    #if useDerivatives
      vec3 res = normalize( perturbWorldNormalDerivatives( nrm, nrmmap, vTexCoord0 ) );
    #else
      vec3 res = normalize( perturbWorldNormal( nrm, nrmmap, vWorldTangent, vWorldBitangent ) );
    #endif

    #if HAS_normalDetail
      #if HAS_normalDetailStrength
        nrmmapDetail.rg = (normalDetailStrength() * (nrmmapDetail.rg-vec2(.5)))+vec2(.5);
      #endif

      #if useDerivatives
        res = normalize( perturbWorldNormalDerivatives( res, nrmmapDetail, vTexCoord1 ) );
      #else
        res = normalize( perturbWorldNormal( res, nrmmapDetail, vWorldTangent, vWorldBitangent ) );
      #endif

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

  #if HAS_alpha && alphaBlending( ALPHA_CUTOUT )
    if( alpha() < .5 ) discard;
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
  vec3 specularColor = SpecularIBL( tEnv, worldReflect, 1.0-gloss() );


  #pragma SLOT lightsf


  float NoV = sdot( viewDir, worldNormal );
  vec3 specularSq = specular()*specular();

  #if HAS_specularTint
    specularSq *= specularTint();
  #endif

  #if noFresnel
    specularColor *= specularSq;
  #else
    specularColor *= F_Schlick( NoV, specularSq, gloss() );
  #endif


  
	#if horizonFading
    float horiz = dot( worldReflect, vWorldNormal );
    horiz = saturate( 1.0 + horiz );
    horiz *= horiz;
    specularColor *= horiz;
  #endif


  vec3 alb = albedo();

  #if HAS_albedoTint
  {
    #if HAS_secondaryTint
      vec3 tint = mix( albedoTint(), secondaryTint(), secondaryTintMask() );
    #else
      vec3 tint = albedoTint();
    #endif

    #if tintBlendMode( TBM_LINEAR_LIGHT )
      alb = blendLinearLight( tint, alb, .5 );
    #endif

    #if tintBlendMode( TBM_MULTIPLY )
      alb *= tint;
    #endif

  }
  #endif


  #if conserveEnergy
    alb = alb - alb * specular();
  #endif
  vec3 albedoSq = alb*alb;


  // white mat override
  #if 0
    albedoSq = vec3(.5) + 0.00001 * albedoSq; 

  #endif

  #if HAS_translu
    diffuseCoef *= vec3(1.0 + translu()*1.5);
  #endif

  #if HAS_occlusion
    diffuseCoef *= occlusion();
  #endif


  #ifdef HAS_GI
  #if HAS_GI
    vec3 agi = GI() * GI_mix();
    float gi = agi.r + agi.g + agi.b;
    // gi = gi * .1 + .9;

    #if HAS_GI_strength
      gi = gi * GI_strength() + (1.0-GI_strength());
    #endif
    diffuseCoef   *= vec3( gi );
    specularColor *= gi;
  #endif
  #endif



  #if HAS_cavity
    #ifndef cavityStrength
      #define cavityStrength(k) vec2(1.0)
    #endif
    diffuseCoef   *= cavity() * cavityStrength().r + (1.0-cavityStrength().r);
    specularColor *= cavity() * cavityStrength().g + (1.0-cavityStrength().g);
  #endif


  #if HAS_emissive
    float e = emissive();
    #if HAS_emissiveScale
      e = e * emissiveScale();
    #endif
    diffuseCoef += vec3( e ) * albedo();
  #endif


  FragColor.xyz = diffuseCoef*albedoSq + specularColor;


  EXPOSURE(FragColor.rgb);
  GAMMA_CORRECTION(FragColor.rgb);

  // #if HAS_alpha
  //   FragColor.a = alpha();
  // #else
  // #endif

  #if HAS_alpha && alphaBlending( ALPHA_STD )
    FragColor.a = alpha();
  #else
    FragColor.a = 1.0;
  #endif


  #pragma SLOT post_color

  // FragColor.rgb = FragColor.rgb*0.0001 + gloss();
  // FragColor.rgb = FragColor.rgb*0.0001 + specular();
  // FragColor.rgb = FragColor.rgb*0.0001 + specularColor;
  // FragColor.rgb = FragColor.rgb*0.0001 + albedo();
  // FragColor.rgb = FragColor.rgb*0.0001 + albedoSq;
  // FragColor.rgb = FragColor.rgb*0.0001 + diffuseCoef;
  // FragColor.rgb = FragColor.rgb*0.0001 + worldNormal;
  // FragColor.rgb = FragColor.rgb*0.0001 + vec3(1.0, 0.0, 0.0);
  // FragColor.rg = vec2(0.0);

  // pure mirror

  // vec3 _rr = reflect( -viewDir, vWorldNormal );
  // vec3 purerefl = SpecularIBL( tEnv, _rr, 0.0 );
  // FragColor.rgb = FragColor.rgb*0.0001 + purerefl;

  #if HAS_normal
  // FragColor.rgb = FragColor.rgb*0.0001 + normal();
  #endif
  #if HAS_normalDetail
    // FragColor.rg = normal().rg;
  #endif


  // #ifdef HAS_GI
  // #if HAS_GI
  //   FragColor.rgb = FragColor.rgb*0.0001 + gi;
  // #endif
  // #endif

}`;


  return __p;
}

fn.toString = fn;

export default fn;
