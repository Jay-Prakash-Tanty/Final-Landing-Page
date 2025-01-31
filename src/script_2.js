import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import getStarfield from "./getStarfield"
import { GLTFLoader } from "three/examples/jsm/Addons.js";
// import { OBJLoader } from "three/examples/jsm/Addons.js";
//camera
/**
 * Base
 */
const canvas_paper = document.querySelector(".hover_catch")
const loader_body = document.querySelector(".loader_body")

var  directionalLight2 = null;
var text= null;
var ScrollPosY = 0
var mixer;

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function(url, item, total){
  console.log("loading is started2")
}

loadingManager.onLoad = function(url, item, total){
  console.log("loading is ended2")
  loader_body.style.scale = 0
    // loader_body.style.display = "none"
}


var gltfLoader = new GLTFLoader(loadingManager);








// Canvas
const canvas = document.querySelector("canvas.webgl2");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader(loadingManager);


/**
 * Stars
 */

const stars = getStarfield({numStars: 7000});
scene.add(stars)


  /**
   * 
   * 
   */

//   const manager = new THREE.LoadingManager();
//   const loader = new OBJLoader(manager);
//   let sceneData = {};
//   manager.onLoad = () => initScene(sceneData);
//   loader.load("./Low_poly_UFO.obj", (obj) => {
//     let geometry;
//     obj.traverse((child) => {
//       if (child.type === "Mesh") {
//         geometry = child.geometry;
//       }
//     });
//     sceneData.geo = geometry;
//   });



  /**
   * sun to make the blackhole revolve
   * 
   */

  var boxex = new THREE.Group();

  const sunGeo = new THREE.SphereGeometry( 1, 32, 16 ); 
  var sun = new THREE.Mesh(sunGeo);
  boxex.add(sun)
  scene.add(boxex)



/**
 * BlackHole
 */

const BlackHoleGlb = await gltfLoader.loadAsync("./assets/blackhole.glb");

const BlackHole = BlackHoleGlb.scene;
    BlackHole.traverse((child)=>{
        if(child.isMesh){
            child.geometry.center();
            // console.log(child.material);
            // child.material = new THREE.MeshNormalMaterial
        }
    })
    // sun.add(mercury)
    sun.add(BlackHole)
//                     x y z
BlackHole.position.set(0,0,-7)

BlackHole.position.y =0.3;
BlackHole.rotateX(0.2)
// BlackHole.rotateZ(0.3)
// BlackHole.rotateY(3)
// BlackHole.scale.set(1.1,1.1,1.1)
console.log("applepie",BlackHoleGlb)


const axeshelper = new THREE.AxesHelper();
scene.add(axeshelper)



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
  1000
);
// camera.position.x = 1;
// camera.position.y = 1;
// camera.position.z = 2;
scene.add(camera);
// camera.position.set(6,6,6)

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const points =[
//     new THREE.Vector3(0, 0, -5),
//     new THREE.Vector3(0, -2, 0),
//     new THREE.Vector3(0, -6, 0),
//     new THREE.Vector3(5, -5, 0),
//     new THREE.Vector3(5, 0, 0),
// ]

// const path = new THREE.CatmullRomCurve3(points, true);

// const pathGeometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(50));
// const pathMaterial = new THREE.LineBasicMaterial({color:0xff00ff});
// const pathObject = new THREE.Line(pathGeometry,pathMaterial);
// scene.add(pathObject)

/**
 * Scroll Animationpoint
 */

const rate = 0.1;
function animate() {
  requestAnimationFrame(animate);
  // console.log("position of blackhole:", BlackHole.position, ScrollPosY,window.scrollY)

  // if(BlackHole.position.z>-2.5){
  //   BlackHole.position.y += (ScrollPosY*5)-6;
  // }
  // else{
    BlackHole.position.z = (ScrollPosY*5)-6;
  //   BlackHole.position.y =0.3;
  // }

  BlackHole.position.y = (ScrollPosY);

  stars.position.z -= (stars.position.z - Math.PI * ScrollPosY * 8) * rate;
  renderer.render(scene, camera);
  // const position = path.getPointAt(Math.PI * ScrollPosY)
  // BlackHole.position.copy(position);
}
animate();


//get scroll data
window.addEventListener("scroll", ()=>{
    ScrollPosY = (window.scrollY / document.body.clientHeight);
    // console.log(ScrollPosY);
})
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();



//follow the path

    const time = Date.now()
    const t = (time / 2000 % 6)/ 6;



  // Update controls
    controls.update();


    //     BlackHole.rotateY(-0.004)
    BlackHole.rotateY(0.005)

    // sun.rotateY(-0.0004)
    // BlackHole.rotation.y = Math.PI * -ScrollPosY
  // Render
  renderer.render(scene, camera);
  // renderer.render(scene, camera);


  // Call tick again on the next framecanva
  window.requestAnimationFrame(tick);
};

tick();
