import GLView from "./engine/GLView";
import Scene from "./engine/Scene";
import Models from './Models'

const selector = document.getElementById('model-selector') as HTMLSelectElement

const modelPaths = [];
for (const name in Models) {
  const path = Models[name];
  modelPaths.push( path )
  const option = document.createElement('option')
  option.textContent = name
  option.value = path
  selector.appendChild( option );
}

selector.addEventListener( 'change', (e) => {
  loadModel( selector.selectedOptions[0].value )
})

const canvas = document.getElementById('gl-canvas') as HTMLCanvasElement


const glview = new GLView(canvas);
const scene = new Scene();
scene.init( glview );

glview.scene = scene;

scene.load().then( ()=>{
  glview.play()
  loadModel( modelPaths[0] )
})



function loadModel( path ){
  scene.loadGltf( path );
}
