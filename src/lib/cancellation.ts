import { AbortSignalLike } from "@azure/abort-controller";

/**
 * Inject an abort signal into a promise, so that it can be cancelled at any time
 * @param p Promise to inject the abort signal into
 * @param signal Abort signal to inject
 * @returns A new promise that will be rejected with an AbortError if the signal is aborted
 */
export function cancellablePromise<T>( p:Promise<T>, signal:AbortSignalLike ) : Promise<T> {
  return new Promise<T>((resolve, reject)=>{
    signal.addEventListener( 'abort', (r:any)=>reject(r) )
    p.then( resolve, reject );
  });
}



let _createNativeSignal : ( signal:AbortSignalLike ) => AbortSignal|undefined;

if( typeof window !== "undefined" && window.AbortController !== undefined ){

  _createNativeSignal = ( signal:AbortSignalLike ) => {
    const ctrl = new AbortController();
    signal.addEventListener( 'abort', ()=>ctrl.abort() );
    return ctrl.signal;
  }
} else {
  _createNativeSignal = ( signal:AbortSignalLike ) => undefined;
}

/**
 * Create a native AbortSignal if possible, otherwise return undefined.
 * Native means that it will be created by native AbortController(), not by @azure/abort-controller.
 * @param signal AbortSignal to wrap
 * @returns A native AbortSignal if possible, otherwise undefined
 */
export const createNativeSignal = _createNativeSignal;

/**
 * Check if an error is an AbortError
 * @param e Event to check
 */
export function isAbortError( e : any ) : boolean {
  return e.name === 'AbortError'; 
}
