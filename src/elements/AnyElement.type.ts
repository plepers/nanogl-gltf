import Accessor   from "./Accessor"  ;
import Buffer     from "./Buffer"    ;
import BufferView from "./BufferView";
import Camera     from "./Camera"    ;
import Material   from "./Material"  ;
import Mesh       from "./Mesh"      ;
import Primitive  from "./Primitive" ;
import Skin       from "./Skin"      ;
import BaseElement from "./BaseElement";


export type AnyElement = 
  Buffer    |
  BufferView|
  Accessor  |
  Animation |
  Material  |
  Camera    |
  Mesh      |
  Primitive |
  Node      |
  Skin      
  ;
