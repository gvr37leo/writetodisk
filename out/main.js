/// <reference path="Head.ts" />
/// <reference path="Bit.ts" />
/// <reference path="Ring.ts" />
/// <reference path="sorts.ts" />
/// <reference path="../node_modules/utilsx/utils.js" />
/// <reference path="../node_modules/@types/three/index.d.ts" />
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, -35, 10);
light.castShadow = true;
scene.add(light);
camera.position.set(0, -1, 0.5).multiplyScalar(40);
camera.up.set(0, 0, 1);
camera.lookAt(new THREE.Vector3(0, 0, 0));
var rings = [];
rings.push(new Ring(25, 20, quikSort));
rings.push(new Ring(15, 15, insertionSort));
rings.push(new Ring(15, 10, heapSort));
function draw() {
    for (var ring of rings)
        ring.update();
}
var render = function () {
    requestAnimationFrame(render);
    draw();
    renderer.render(scene, camera);
};
render();
//# sourceMappingURL=main.js.map