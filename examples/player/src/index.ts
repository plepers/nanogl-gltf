import GLView from "./engine/GLView";
import Scene from "./engine/Scene";


const canvas = document.getElementById('gl-canvas') as HTMLCanvasElement


const glview = new GLView(canvas);
const scene = new Scene();
scene.init( glview );

glview.scene = scene;

try{
  scene.load().then( ()=>{
    glview.play()
  })

}catch(e){
  console.log( e )
}


