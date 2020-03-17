import GLView from "./engine/GLView";
import Scene from "./engine/Scene";
import Models from './Models'

const selector = document.getElementById('model-selector') as HTMLSelectElement

const modelPaths = [];
for (const name in Models) {
  const path = Models[name];
  modelPaths.push(path)
  const option = document.createElement('option')
  option.textContent = name
  option.value = path
  selector.appendChild(option);
}

selector.addEventListener('change', (e) => {
  loadModel(selector.selectedOptions[0].value)
})

const canvas = document.getElementById('gl-canvas') as HTMLCanvasElement


const glview = new GLView(canvas);
const scene = new Scene();
scene.init(glview);

glview.scene = scene;

scene.load().then(() => {
  glview.play()
  // loadModel( modelPaths[0] )
  const storedSelected = localStorage.getItem('selectedmodel');
  if (storedSelected) {
    loadModel(storedSelected)
  } else {
    loadModel(Models['TextureTransformTest.gltf'])
  }
})





function loadModel(path) {
  selector.selectedIndex = modelPaths.indexOf(path)
  scene.loadGltf(path).then(()=>{
    localStorage.setItem('selectedmodel', path)
  });
}


window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case "ArrowUp":
      selector.selectedIndex--
      loadModel(selector.selectedOptions[0].value)
      break;
    case "ArrowDown":
      selector.selectedIndex++
      loadModel(selector.selectedOptions[0].value)
      break;
  }

  
})