import { TYPE_BUFFER, TYPE_BUFFERVIEW, TYPE_ACCESSOR, TYPE_ANIMATION } from "../consts";
import Buffer from "./Buffer";
import BufferView from "./BufferView";
import Accessor from "./Accessor";
import Animation from "./Animation";


const _DEFINITIONS = new Map( [
  [TYPE_BUFFER      , Buffer],
  [TYPE_BUFFERVIEW  , BufferView],
  [TYPE_ACCESSOR    , Accessor],
  [TYPE_ANIMATION   , Animation],
])

export default function createElement( type ){
  if( ! _DEFINITIONS.has( type ) ){
    throw new Error( `Gltf - no definition for '${type}'` )
  }
  return _DEFINITIONS.get(type);
}