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
// scene.add( floor );
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
    for (var ring of rings)
        ring.update();
}
var render = function () {
    requestAnimationFrame(render);
    draw();
    renderer.render(scene, camera);
};
render();
function heapSort(array) {
    heapify(array);
    for (var i = 0; i < array.length - 1; i++) {
        swap(array, 0, array.length - 1 - i);
        bubbleDown(array, 0, array.length - 1 - i);
    }
}
function heapify(array) {
    for (var i = 1; i < array.length; i++) {
        bubbleUp(array, i);
    }
}
function bubbleUp(array, i) {
    if (i == 0)
        return;
    var pa = getParent(i);
    if (array[i] > array[pa]) {
        swap(array, i, pa);
        bubbleUp(array, pa);
    }
}
function bubbleDown(array, i, length) {
    var bigChild = leftChild(i);
    if (bigChild >= length)
        return;
    var rchild = rightChild(i);
    if (rchild < length && array[rchild] > array[bigChild])
        bigChild = rchild;
    if (array[i] > array[bigChild])
        return; //if current element is bigger and thus in the right spot, just return
    else
        swap(array, i, bigChild);
    bubbleDown(array, bigChild, length);
}
function getParent(i) {
    return Math.floor((i - 1) / 2);
}
function leftChild(i) {
    return i * 2 + 1;
}
function rightChild(i) {
    return i * 2 + 2;
}
function bubbleSort(array) {
    var swapped = true;
    var toSort = array.length;
    while (swapped) {
        swapped = false;
        for (var i = 1; i < toSort; i++) {
            if (array[i - 1] > array[i]) {
                swap(array, i - 1, i);
                swapped = true;
            }
        }
        toSort--;
    }
}
function insertionSort(array) {
    for (var i = 1; i < array.length; i++) {
        for (var j = i; j > 0; j--) {
            if (array[j - 1] > array[j]) {
                swap(array, j - 1, j);
            }
            else
                break;
        }
    }
}
function quikSort(array) {
    quikSortPr(array, 0, array.length - 1);
}
function quikSortPr(array, low, high) {
    if (low >= high)
        return;
    var pivot = array[Math.floor((low + high) / 2)];
    var wall = partition(array, low, high, pivot);
    quikSortPr(array, low, wall - 1);
    quikSortPr(array, wall, high);
}
function partition(array, low, high, pivot) {
    var left = low;
    var right = high;
    while (left <= right) {
        while (array[left] < pivot)
            left++;
        while (array[right] > pivot)
            right--;
        if (left <= right) {
            swap(array, left, right);
            left++;
            right--;
        }
    }
    return left;
}
function swap(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}
function _mergeSort(array) {
    mergeSort(array, 0, array.length, []);
}
function mergeSort(array, from, to, temp) {
    if (to - from < 2)
        return;
    var middle = Math.floor((from + to) / 2);
    mergeSort(array, from, middle, temp);
    mergeSort(array, middle, to, temp);
    merge(array, from, middle, to, temp);
}
function merge(array, from, middle, end, scratch) {
    var left = from;
    var right = middle;
    var index = left;
    while (left < middle && right < end) {
        if (array[left] < array[right]) {
            scratch[index] = array[left];
            left++;
        }
        else {
            scratch[index] = array[right];
            right++;
        }
        index++;
    }
    copy(array, left, scratch, index, middle - left);
    copy(array, right, scratch, index, end - right);
    copy(scratch, from, array, from, end - from);
}
function copy(source, srcFrom, dest, destFrom, length) {
    for (var i = srcFrom; i < srcFrom + length; i++)
        dest[destFrom++] = source[i];
}
//# sourceMappingURL=main.js.map