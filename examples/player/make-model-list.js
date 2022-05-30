const glob       = require( 'glob' );
const fs         = require( 'fs' );
const path       = require( 'path' );

const globPatterns = [
  './test/samples/other/**/*.gltf',
  './test/samples/other/**/*.glb',
  './test/samples/models/2.0/**/*.gltf',
  './test/samples/models/2.0/**/*.glb',
  './test/samples/generator/Output/**/*.gltf',
  './test/samples/generator/Output/**/*.glb',
]



let files = []
for (const patt of globPatterns) {
  files = files.concat( glob.sync( patt ) )
}



const json = []
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  name = path.basename( file )
  if( file.toLowerCase().indexOf( 'draco' ) > -1 ) name += ' (draco)'
  if( file.toLowerCase().indexOf( 'speculargloss' ) > -1 ) name += ' (specular)'
  if( file.toLowerCase().indexOf( 'embedded' ) > -1 ) name += ' (embedded)'
  if( file.toLowerCase().indexOf( 'quantized' ) > -1 ) name += ' (quantized)'
  url = path.relative( './test/samples/', file )
  json.push({name, url})
  
}


const moduleStr = 'const Models = '+JSON.stringify( json, null, 2 )+'\n export default Models'

fs.writeFile( 'examples/player/src/Models.js', moduleStr, {encoding:'utf-8'}, function( e ){
  //done
  // console.log( e, jsPath )
})