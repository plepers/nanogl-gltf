const glob       = require( 'glob' );
const fs         = require( 'fs' );
const path       = require( 'path' );

const globPatterns = [
  './test/samples/models/2.0/**/*.gltf',
  './test/samples/models/2.0/**/*.glb',
  './test/samples/generator/Output/**/*.gltf',
  './test/samples/generator/Output/**/*.glb',
]



let files = []
for (const patt of globPatterns) {
  files = files.concat( glob.sync( patt ) )
}



const json = {}
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  name = path.basename( file )
  url = path.relative( './test/samples/', file )
  json[name] = url
  
}


const moduleStr = 'const Models = '+JSON.stringify( json, null, 2 )+'\n export default Models'

fs.writeFile( 'examples/player/src/Models.js', moduleStr, {encoding:'utf-8'}, function( e ){
  //done
  // console.log( e, jsPath )
})