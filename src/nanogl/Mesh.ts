import {GLContext } from 'nanogl/types'
import Primitive from './Primitive';

export default class Mesh {
    
  gl: GLContext;
  name: string;
  primitives: Primitive[];

  constructor( gl:GLContext ){
    this.gl = gl;
    this.name = '';
    this.primitives = [];
  }

}
