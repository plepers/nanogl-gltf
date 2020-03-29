import GLView from "./engine/GLView";
import Scene from "./engine/Scene";
import _Models from './Models'

type Mentry = {
  name : string,
  url:string
}
const Models : Mentry[] = _Models

const selector = document.getElementById('model-selector') as HTMLSelectElement
const nextbtn = document.getElementById('next-model')
const statusEl = document.getElementById('status')

const modelPaths = [];
for (const model of Models) {
  const {name, url} = model
  modelPaths.push(url)
  const option = document.createElement('option')
  option.textContent = name
  option.value = url
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
    loadModel(Models[0].url)
  }
})





function loadModel(path) {
  selector.selectedIndex = modelPaths.indexOf(path)
  statusEl.innerText = "loading"
  return scene.loadGltf(path).then(()=>{
    localStorage.setItem('selectedmodel', path)
    statusEl.innerText = "loaded"
  }).catch((e)=>{
    console.log(e)
    statusEl.innerText = e.message
  });
}

nextbtn.onclick = ()=>{
  selector.selectedIndex++
  loadModel(selector.selectedOptions[0].value)
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



// stress test

function stessTest(){
  setInterval( ()=>{
    loadModel(Models[Math.floor(Math.random()*Models.length)].url)
  }, 200 )
}

let currentSeq = -1;
function loadSeqentially(){
  currentSeq++
  if( currentSeq >= Models.length) currentSeq = 0;
  loadModel( Models[currentSeq].url ).then(()=>{
    return new Promise( (r)=>setTimeout(r, 200 ) )
  }).then( loadSeqentially );
}


// stessTest()
loadSeqentially()