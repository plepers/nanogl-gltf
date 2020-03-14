
{{= if( obj.pf === true ){ }}
  IN mediump vec2 {{@mod.varying}};
{{= } }}

{{= if( obj.pv === true ){ }}
  OUT mediump vec2 {{@mod.varying}};
  {{= if( obj.mod._defineAttrib === true ){ }}
    IN mediump vec2 {{@mod.attrib}};
  {{= } }}
{{= } }}


{{= if( obj.v === true ){ }}

  #define TC {{@mod.varying}}

  TC = {{@mod.attrib}};
  #if HAS_transform_{{@mod.varying}}
    #if HAS_pivot_{{@mod.varying}}
    TC = ( mat2( transform_{{@mod.varying}}() ) * (TC-pivot_{{@mod.varying}}() ) ) + pivot_{{@mod.varying}}();
    #else
    TC = mat2( transform_{{@mod.varying}}() ) * TC;
    #endif
  #endif

  #if HAS_translate_{{@mod.varying}}
    TC += translate_{{@mod.varying}}();
  #endif

  #undef TC

{{= } }}
