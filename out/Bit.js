var BitGeometry = new THREE.BoxGeometry(1, 1, 1);
var bitMaterialOn = new THREE.MeshPhongMaterial({ color: 0xdddddd });
var bitMaterialOff = new THREE.MeshPhongMaterial({ color: 0x111111 });
;
var bitMaterialMap = new Map();
bitMaterialMap.set(true, bitMaterialOn);
bitMaterialMap.set(false, bitMaterialOff);
var Bit = (function () {
    function Bit(pos) {
        this.state = false;
        this.mesh = new THREE.Mesh(BitGeometry, bitMaterialOff);
        this.mesh.position.add(pos);
        scene.add(this.mesh);
    }
    Bit.prototype.set = function (bool) {
        this.state = bool;
        this.mesh.material = bitMaterialMap.get(this.state);
    };
    Bit.prototype.toggle = function () {
        this.state = !this.state;
        this.mesh.material = bitMaterialMap.get(this.state);
    };
    return Bit;
}());
//# sourceMappingURL=Bit.js.map