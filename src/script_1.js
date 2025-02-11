import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import getStarfield from "./getStarfield"

/**
 * Base
 */
const canvas_paper = document.querySelector(".hover_catch")
const loader_body = document.querySelector(".loader_body")

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function(url, item, total){
  console.log("loading is started")
  loader_body.style.scale = 1
  // loader_body.style.display = "block"
}

loadingManager.onLoad = function(url, item, total){
  console.log("loading is ended")
}


var text= null;

console.log("abraka dabra")


// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader(loadingManager);

/**
 * Stars
 */

const stars = getStarfield({numStars: 4500});
scene.add(stars)

/**
 * font
 */

// scene.background = new THREE.Color("#00")camera

const fontLOader =  new FontLoader(loadingManager);
fontLOader.load("./assets/Saira Stencil One_Regular.json", 
  (font)=>{
  const textGeometry = new TextGeometry("THE  UNIVERSE",{
    font: font,
    size: 0.5,
    height: 0.001,
    curveSegments: 100,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.01,
    bevelOffset:0,
    bevelSegments:13,


  });
/*
lights x y z
*/

//back light
  const directionalLight = new THREE.DirectionalLight(0xFF4400, 0.7)
  directionalLight.position.set(0,-0.1,-1)
  scene.add(directionalLight)

//front light
  const directionalLight2 = new THREE.DirectionalLight(0xFF4400, 0.7)
  directionalLight2.position.set(-0.1,-0.1,1)
  scene.add(directionalLight2)

  const directionalLight7 = new THREE.DirectionalLight(0xFFCD00, 0.7)
  directionalLight7.position.set(0.1,-0.1,1)
  scene.add(directionalLight7)

//bottom light
  const directionalLight3 = new THREE.DirectionalLight(0xFF4400, 1)
  directionalLight3.position.set(0,-1,0)
  scene.add(directionalLight3)

//top light
  const directionalLight4 = new THREE.DirectionalLight(0xFF4400, 1)
  directionalLight4.position.set(0,1,0)
  scene.add(directionalLight4)

//left light
  const directionalLight5 = new THREE.DirectionalLight(0xFF4400, 0.1)
  directionalLight5.position.set(-1,0,0)
  scene.add(directionalLight5)

//right light
  const directionalLight6 = new THREE.DirectionalLight(0xFFCD00, 0.1)
  directionalLight6.position.set(1,0,0)
  scene.add(directionalLight6)

  const pointLight = new THREE.PointLight(0xFFCD00, 1)
  pointLight.position.set(1,1,1)
  // scene.add(pointLight)

  var pointLight2 = new THREE.PointLight(0xcc00cc, 1)
  pointLight2.position.set(0,0,1)
  // scene.add(pointLight2)

  // var pointLight3 = new THREE.PointLight(0x4b3714, 2)
  // pointLight3.position.set(1.5,0,1)
  // scene.add(pointLight3)

  // var pointLight4 = new THREE.PointLight(0x4b3714, 2)
  // pointLight4.position.set(-1.5,0,1)
  // scene.add(pointLight4)

  // const rectAreaLight = new THREE.RectAreaLight(0x4b3714, 9 ,-10, 1)
  // scene.add(rectAreaLight)


  const ambientLight = new THREE.AmbientLight()
  ambientLight.color= new THREE.Color("white");
  ambientLight.intensity = 0.2;
  // scene.add(ambientLight)




  
  const loader = new THREE.TextureLoader(loadingManager);
				// loader.setPath( 'textures/cube/Bridge2/' );
  const textMaterial = new THREE.MeshStandardMaterial();
  textMaterial.roughness=0.4;
  textMaterial.metalness=0.8
  // textMaterial.wireframe = true;
  text = new THREE.Mesh(textGeometry, textMaterial);
  textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -textGeometry.boundingBox.max.x * 0.5,
  //   -textGeometry.boundingBox.max.y * 0.5,
  //   -textGeometry.boundingBox.max.z * 0.5
  // )
  textGeometry.center();

  scene.add(text);



//oscilation rotation in the y axis
var y_oscilation_interval = null
  var y =0
  text.rotation.y = 0.65
  const Oscilate_y_axis = () => {

    y -= 0.01
      text.rotateY(Math.sin(y)*0.006)

  
  }
  function run_the_rotation_function(){
    y_oscilation_interval = setInterval(Oscilate_y_axis, 15);
  }
  run_the_rotation_function()
  
controls.addEventListener( 'start', onStart );
controls.addEventListener( 'end', onEnd );


// function get_text_rotation_data(){
//   console.log("why:",text.rotation)
//   console.log("camera position:")
// }

// var text_rotation_data
var mouse_dragging = false
// starting new drag with OrbitCintrols -- recover the min.max values
function onStart( event )
{
  // text_rotation_data = setInterval(get_text_rotation_data, 15);
  clearInterval(y_oscilation_interval);
  console.log("start is started")
  canvas_paper.style.cursor = "grabbing";
  mouse_dragging = true;

}
var camera_vector = new THREE.Vector3(0,0.2,3)
var rotation_vector = new THREE.Vector3(0,0.6,0)

//reset camera position and rotation smoothly
function reset_camera (){
  camera.position.lerp(camera_vector,0.04)
}
// function reset_rotation(){

//   var non = 0
//   var apple = non.lerp(0.2,1,0.04)
// }
// enging drag with OrbitControls -- activate smooth reset
function onEnd( event )
{
  console.log("end is ended")

    // const reset_rotation_interval = setInterval(reset_rotation, 40);
    if(mouse_dragging == true){
    const reset_camera_interval = setInterval(reset_camera, 10);
    setTimeout(()=>{
      clearInterval(reset_camera_interval)
    },1000)
		// clearInterval(text_rotation_data);
    run_the_rotation_function()
    mouse_dragging = true
    canvas_paper.style.cursor = "grab";
  }
}
})
console.log("tester", Math.sin(4))
// const axeshelper = new THREE.AxesHelper();
// scene.add(axeshelper)


/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);
camera.position.set(0,0.2,3)

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({antialias:true,canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
/*


*/

// var smoothReset = false;


// // function to smooth reset the OrbitControl camera's angles
// function doSmoothReset( )
// {
// 		// get current angles
// 		var alpha = controls.getAzimuthalAngle( ),
// 				beta = controls.getPolarAngle( )-Math.PI/2;
	
// 		// if they are close to the reset values, just set these values
// 		if( Math.abs(alpha) < 0.001 ) alpha = 0;
// 		if( Math.abs(beta) < 0.001 ) beta = 0;

// 		// smooth change using manual lerp
// 		controls.minAzimuthAngle = 0.95*alpha;
// 		controls.maxAzimuthAngle = controls.minAzimuthAngle;

// 		controls.minPolarAngle = Math.PI/2 + 0.95*beta;
// 		controls.maxPolarAngle = controls.minPolarAngle;

// 		// if the reset values are reached, exit smooth reset
// 		if( alpha == 0 && beta == 0) onStart( )
// }


// function animationLoop( t )
// {
// 		if( smoothReset ) doSmoothReset( );

// 		controls.update( );
// 		light.position.copy( camera.position );
//     renderer.render( scene, camera );
// }

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();




  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  // renderer.setAnimationLoop( animationLoop );
  // renderer.render(scene, camera);
  // renderer.setScissor(0,0,320,240);
  // renderer.setViewport(0,0,320,240);
  // renderer.setSize(320,240);
  // renderer.getContext().canvas.width = 320
  // renderer.getContext().canvas.height = 240
  // renderer.getContext().canvas.style.width = '100%'
  // renderer.getContext().canvas.style.height = '240px'

  // Call tick again on the next framecanva
  window.requestAnimationFrame(tick);
};

tick();
