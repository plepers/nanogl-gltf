import when from 'when';


const _domParser = new DOMParser();



export function whenAll( promises ){
  const def = when.defer()
  let remaining = promises.length;

  const oneResolve = ()=>{
    remaining--;
    def.notify( 1 - remaining/promises.length )
    if( remaining === 0 ){
      def.resolve( true );
    }
  }

  for ( var p of promises ) {
    p.then( oneResolve, def.reject );
  }

  return def.promise;
}



export function loadText( url ) {
  return _ajax( url, '' );
}



export function loadJson( url ) {
  return loadText( url )
    .then( str => JSON.parse(str) );
  
}



export function loadXml( url ) {
  return loadText( url )
    .then( str =>
      _domParser.parseFromString( str, "application/xml" )
    );
}



export function loadBytes( url ) {
  return _ajax( url, 'arraybuffer' );
}



export function loadImage( url ){

  const defer = when.defer();
  const img = new Image();
  img.onload = defer.resolve;
  img.onerror = defer.reject;
  img.crossOrigin = 'anonymous';
  img.src = url;

  return defer.promise.yield( img );
}


export function baseDir( p ) : string[]{
  const sep = p.lastIndexOf("/");
  return [
    p.substr( 0, sep ),
    p.substr( sep + 1 ),
  ]
}



let _requestsList = []
let _requestsMap = {}
let _UID = 0;



export function releaseAll(){
  for ( var req of  _requestsList ) {
    req.xhr.abort()
    req.defer.reject()
  }
  _requestsMap = {}
  _requestsList.length = 0;
}



function _ajax( url, rtype ) {
  return _getAjax( url, rtype ).defer.promise.then( yieldResponse );
}



function yieldResponse( req ){
  return req.xhr.response;
}



function _getAjax( url, rtype ) {


  const method = 'GET';
  const deferred = when.defer();
  const xhr = new XMLHttpRequest();

  const req = {
    xhr : xhr,
    id : _UID++,
    defer : deferred
  }


  xhr.open(method, url, true);

  if( rtype === 'arraybuffer' )
    xhr.setRequestHeader("Accept", 'application/octet-stream');
  
  xhr.responseType = rtype;
  xhr.onload = function() {
    deferred.resolve(req);
  };
  xhr.onerror = function(e) {
    deferred.reject( req );
  };

  xhr.send();

  _requestsList.push( req )
  _requestsMap[req.id] = req;

  deferred.promise.then( _reqComplete )
  return req;
}


function _reqComplete( req ){
  delete _requestsMap[req.id];
  const i = _requestsList.indexOf( req );
  if( i > -1 )
    _requestsList.splice( i, 1 );
}

