
/**
 * Implementation of a deferred promise, that can be resolved or rejected from outside, at anytime.
 */
export default class Deferred<T=unknown> {

  /**
   * Created promise that can be resolved or rejected from outside
   */
  readonly promise : Promise<T>;
  
  /**
   * Resolve function
   */
  _resolve : (value?: T | PromiseLike<T>) => void;

  /**
   * Reject function
   */
  _reject  : (reason?: any) => void;

  constructor(){
      this.promise = new Promise<T>( (resolve, reject)=>{
          this._resolve = resolve;
          this._reject = reject;
      })
  }

  /**
   * Resolve the promise with a value
   * @param value Value to resolve the promise with, will be returned by the promise
   */
  resolve = (value?: T | PromiseLike<T>) => {
      this._resolve( value );
  }

  /**
   * Reject the promise with a reason
   * @param reason Reason to reject the promise with
   */
  reject = (reason?: any) => {
      this._reject( reason );
  }
  
}