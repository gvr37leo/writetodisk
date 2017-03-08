var BitGeometry = new THREE.BoxGeometry(1,1,1);
var bitMaterialOn = new THREE.MeshPhongMaterial( { color: 0xdddddd } );
var bitMaterialOff = new THREE.MeshPhongMaterial( { color: 0x111111 } );
declare class Map{
    set(key, value);
    get(key);
};

var bitMaterialMap = new Map()
bitMaterialMap.set(true,bitMaterialOn)
bitMaterialMap.set(false,bitMaterialOff)

class Bit{
    mesh:THREE.Mesh
    state:boolean = false

    constructor(pos:THREE.Vector3){
        this.mesh = new THREE.Mesh( BitGeometry, bitMaterialOff );
        this.mesh.position.add(pos);
        scene.add(this.mesh)
    }

    set(bool:boolean){
        this.state = bool
        this.mesh.material = bitMaterialMap.get(this.state)
    }

    toggle(){
        this.state = !this.state
        this.mesh.material = bitMaterialMap.get(this.state)
    }
}