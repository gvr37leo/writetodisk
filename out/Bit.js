var BitGeometry = new THREE.BoxGeometry(1, 1, 1);
class Bit {
    constructor(pos, val, max) {
        var brightness = val / max;
        this.mesh = new THREE.Mesh(BitGeometry, new THREE.MeshPhongMaterial({ color: new THREE.Color(brightness, brightness, brightness).getHex() }));
        this.mesh.position.add(pos);
        scene.add(this.mesh);
    }
    set(value) {
        this.value = value;
    }
}
//# sourceMappingURL=Bit.js.map