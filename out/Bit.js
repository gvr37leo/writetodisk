var BitGeometry = new THREE.BoxGeometry(1, 1, 1);
var bitMaterialOn = new THREE.MeshPhongMaterial({ color: 0xdddddd });
var bitMaterialOff = new THREE.MeshPhongMaterial({ color: 0x111111 });
;
var bitMaterialMap = new Map();
bitMaterialMap.set(true, bitMaterialOn);
bitMaterialMap.set(false, bitMaterialOff);
class Bit {
    constructor(pos) {
        this.state = false;
        this.mesh = new THREE.Mesh(BitGeometry, bitMaterialOff);
        this.mesh.position.add(pos);
        scene.add(this.mesh);
    }
    set(bool) {
        this.state = bool;
        this.mesh.material = bitMaterialMap.get(this.state);
    }
    toggle() {
        this.state = !this.state;
        this.mesh.material = bitMaterialMap.get(this.state);
    }
}
//# sourceMappingURL=Bit.js.map