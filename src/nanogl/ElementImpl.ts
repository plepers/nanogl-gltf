
import { AnyElement } from "../elements/AnyElement.type";




export default class ElementImpl<T extends AnyElement> {

  _element : T;

  constructor( element : T ){
    this._element = element;
  }

  getElement() : T {
    return this._element;
  }

}