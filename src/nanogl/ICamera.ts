
export interface ILens{

  aspect:number;
  getProjection():Float32Array;

}


export interface ICamera {

  lens : ILens;

  _view     : Float32Array;
  _viewProj : Float32Array ;
  
  modelViewMatrix( out:Float32Array, model:Float32Array );
  modelViewProjectionMatrix(out:Float32Array, model:Float32Array)
  getMVP( model:Float32Array ) : Float32Array;
  updateViewProjectionMatrix( w:number, h:number );
}



export interface NGLPerspectiveLens extends ILens{

  fov    : number;
  near   : number;
  far    : number;


  setHorizontalFov( fov:number );
  setVerticalFov( fov:number );

  getHorizontalFov( ):number;
  getVerticalFov( ):number;

  setAutoFov( fov:number );

  _updateProjection();

}



export interface NGLOrthographicLens extends ILens{

  near   : number;
  far    : number;


  setBound( xMin:number, xMax:number, yMin:number, yMax:number );
  _updateProjection();

}
