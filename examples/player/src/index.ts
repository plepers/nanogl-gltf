
import GltfIO from "nanogl-gltf/io/web";

console.log('toto')

GltfIO.loadGltf('./models/Avocado.glb' ).then((gltf)=>{
  console.log( gltf );
})