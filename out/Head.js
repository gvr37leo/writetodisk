var HeadGeometry = new THREE.BoxGeometry(1, 1, 1);
var HeadMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
var headSinkDepth = new THREE.Vector3(0, 0, -1);
class Head {
    constructor(pos) {
        this.originalPosition = pos.clone();
        this.mesh = new THREE.Mesh(HeadGeometry, HeadMaterial);
        this.mesh.position.add(pos);
        scene.add(this.mesh);
    }
}
//# sourceMappingURL=Head.js.map