var HeadGeometry = new THREE.BoxGeometry(1,1,1);
var HeadMaterial = new THREE.MeshPhongMaterial( { color: 0x888888 } );

class Head{
    mesh:THREE.Mesh

    constructor(pos:THREE.Vector3){
        this.mesh = new THREE.Mesh( HeadGeometry, HeadMaterial );
        this.mesh.position.add(pos);
        scene.add(this.mesh)
    }
}