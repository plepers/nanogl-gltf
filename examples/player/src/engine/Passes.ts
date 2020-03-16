

export enum Passes {
  COLOR = 'color',
  DEPTH = 'depth',
  DEFAULT = COLOR
}

export enum Masks {

  OPAQUE        = 1<<0,
  BLENDED       = 1<<1,
  SHADOW_CASTER = 1<<10,

}