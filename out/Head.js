var HeadGeometry = new THREE.BoxGeometry(1, 1, 1);
var HeadMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
var Head = (function () {
    function Head(pos) {
        this.mesh = new THREE.Mesh(HeadGeometry, HeadMaterial);
        this.mesh.position.add(pos);
        scene.add(this.mesh);
    }
    return Head;
}());
//# sourceMappingURL=Head.js.map