import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { OrbitControls } from 'https://unpkg.com/three@<version>/examples/jsm/controls/OrbitControls.js';
//import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
//import { GUI } from 'https://unpkg.com/three@<version>/examples/jsm/libs/lil-gui.module.min.js';

console.log('from INDEX.JS')
//console.log(OrbitControls)


function main() {
  const canvas = document.getElementById("c-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
  });

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  // const controls = new OrbitControls(camera, canvas);
  // controls.target.set(0, 0, 0);
  // controls.update();
  //controls.enableDamping = true;

  //const gui = new GUI();

  const scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({
      color,
      opacity: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;
    scene.add(cube);

    // const folder = gui.addFolder(`Cube${x}`);
    // folder.addColor(new ColorGUIHelper(material, 'color'), 'value')
    //     .name('color')
    //     .onChange(requestRenderIfNotRequested);
    // folder.add(cube.scale, 'x', .1, 1.5)
    //     .name('scale x')
    //     .onChange(requestRenderIfNotRequested);
    // folder.open();

    return cube;
  };
  
  const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
  ];
  // makeInstance(geometry, 0x44aa88,  0);
  // makeInstance(geometry, 0x8844aa, -2);
  // makeInstance(geometry, 0xaa8844,  2);


  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);


  //let renderRequested = false;

  //function render(){
  //  let renderRequested = false
  //   => //all below
  // };
  function render(time) {
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const pixelRatio = window.devicePixelRatio;
      const width  = canvas.clientWidth  * pixelRatio | 0;
      const height = canvas.clientHeight * pixelRatio | 0;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    if(resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    
    time *= 0.001;

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render)
  
  //render();
  // function requestRenderIfNotRequested() {
  //   if (!renderRequested) {
  //     renderRequested = true;
  //     requestAnimationFrame(render);
  //   }
  // }

  // controls.addEventListener('change', requestRenderIfNotRequested);
  // window.addEventListener('resize', requestRenderIfNotRequested);
};


//window.onload = main;
main();