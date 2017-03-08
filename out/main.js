/// <reference path="Head.ts" />
/// <reference path="Bit.ts" />
/// <reference path="Ring.ts" />
/// <reference path="../node_modules/utilsx/utils.js" />
/// <reference path="../node_modules/@types/three/index.d.ts" />
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var planeGeometry = new THREE.PlaneGeometry(20, 20, 10, 10);
var planeMaterial = new THREE.MeshPhongMaterial({ color: 0x777777, side: THREE.DoubleSide });
planeMaterial.shading = THREE.FlatShading;
var floor = new THREE.Mesh(planeGeometry, planeMaterial);
floor.receiveShadow = true;
scene.add(floor);
var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, -35, 10);
light.castShadow = true;
scene.add(light);
camera.position.z = 20;
camera.position.y = -60;
camera.lookAt(new THREE.Vector3(0, 0, 0));
var rings = [];
rings.push(new Ring(100, 30));
rings.push(new Ring(80, 25));
rings.push(new Ring(60, 20));
function draw() {
    for (var _i = 0; _i < rings.length; _i++) {
        var ring = rings[_i];
        ring.update();
    }
}
var render = function () {
    requestAnimationFrame(render);
    draw();
    renderer.render(scene, camera);
};
render();
//# sourceMappingURL=main.js.map