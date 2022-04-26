

type Listener<T> = (e?:T)=>void

export default class Signal<T = any> {

  private  _listeners: Listener<T>[];
  
  constructor(){
    this._listeners = [];
  }


  on( fn : Listener<T> ){
    if( this._listeners.indexOf(fn) === -1 ){
      this._listeners.push( fn );
    }
  }


  off( fn : Listener<T> ){
    const i = this._listeners.indexOf(fn);
    if( i > -1 ){
      this._listeners.splice( i, 1 );
    }
  }


  release(){
    this._listeners = [];
  }


  emit( e?:T ){
    for (const cbk of this._listeners) {
      cbk( e );
    }
  }


}
