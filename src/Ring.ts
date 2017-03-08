/// <reference path="Bit.ts" />
/// <reference path="Head.ts" />
/// <reference path="../node_modules/utilsx/utils.js" />



class Ring{
    bits:Bit[]
    head:Head
    radius:number
    diskSize:number
    rotationSpeed:number
    currentRotation:number
    targetRotation:number
    spacing:number
    flag:boolean = false

    constructor(diskSize:number, radius:number){
        this.bits = []
        this.diskSize = diskSize
        this.spacing = Math.PI * 2 / diskSize;
        for(var i = 0; i < diskSize; i++){
            var pos = new THREE.Vector3(0,-radius,1)
            pos.applyAxisAngle(new THREE.Vector3(0,0,1), i * this.spacing)
            this.bits.push(new Bit(pos))
        }
        
        this.rotationSpeed = 0.01;
        this.currentRotation = 0;
        this.targetRotation = this.spacing * 10
        var head = new Head(new THREE.Vector3(0,-radius,3))
    }

    update(){
        var step = min(this.rotationSpeed,Math.abs(this.targetRotation - this.currentRotation))
        if(this.targetRotation < this.currentRotation)step = -step;
        this.currentRotation += step
        for(var bit of this.bits){
            bit.mesh.position.applyAxisAngle(new THREE.Vector3(0,0,1), step)
        }
        if(step == 0){
            this.bits[mod(Math.round(-this.currentRotation / this.spacing), this.diskSize)].toggle()
            var randomness = Math.floor(random(20,40));
            if(this.flag)this.targetRotation += this.spacing * randomness;
            else this.targetRotation -= this.spacing * randomness;
            this.flag = !this.flag
        }
    }
}