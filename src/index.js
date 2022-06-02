import Movements from './movements.js';

//declaring new scene with three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1ef);

//camera and renderer config
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// adding some light into the scene
const ambientLight = new THREE.AmbientLight(0xbda355);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
ambientLight.add(directionalLight);
scene.add(ambientLight);

//flat plane of existence
const planeGeometry = new THREE.BoxGeometry(100, 0.2, 50);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x00001a });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

//creating a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0xff0066 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

//adding a cone to the scene
const coneGeometry = new THREE.ConeGeometry(2, 8, 8);
const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(-8, 5, 0);
scene.add(cone);

//positioning a camera
camera.position.set(10, 5, 40);

//animating the scene
function animate() {
	//cube rotation
	cube.rotation.x += 0.05;
	cube.rotation.y += 0.05;
	//cone rotation
	cone.rotation.y += 0.01;
	cone.rotation.x += 0.03;
	requestAnimationFrame(animate);

	//movements to the left
	if (Movements.isPressed(37)) {
		camera.position.x -= 0.05;
	}

	//movements to the up
	if (Movements.isPressed(38)) {
		camera.position.x += 0.05;
		camera.position.y += 0.05;
	}

	//movements to the right
	if (Movements.isPressed(39)) {
		camera.position.x += 0.05;
	}

	//movements to the down
	if (Movements.isPressed(40)) {
		camera.position.x -= 0.05;
		camera.position.y -= 0.05;
	}

	camera.lookAt(plane.position);

	renderer.render(scene, camera);
}
animate();
//rendering a scene
// renderer.render(scene, camera);
