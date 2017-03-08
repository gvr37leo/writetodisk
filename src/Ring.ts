/// <reference path="Bit.ts" />
/// <reference path="Head.ts" />
/// <reference path="../node_modules/utilsx/utils.js" />

enum State{rolling, writing}

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
    state:State
    writeCompletion:number;

    constructor(diskSize:number, radius:number){
        this.state = State.rolling;
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
        this.head = new Head(new THREE.Vector3(0,-radius,3))
    }

    update(){
        if(this.state == State.rolling){
            var step = min(this.rotationSpeed,Math.abs(this.targetRotation - this.currentRotation))
            if(this.targetRotation < this.currentRotation)step = -step;
            this.currentRotation += step
            for(var bit of this.bits){
                bit.mesh.position.applyAxisAngle(new THREE.Vector3(0,0,1), step)
            }
            if(step == 0){
                
                var randomness = Math.floor(random(20,40));
                if(this.flag)this.targetRotation += this.spacing * randomness;
                else this.targetRotation -= this.spacing * randomness;
                this.flag = !this.flag
                this.state = State.writing
                this.writeCompletion = 0;
            }
        }else if(this.state == State.writing){
            this.writeCompletion += 0.05;
            if(floatEquals(this.writeCompletion, 0.5)){
                this.bits[mod(Math.round(-this.currentRotation / this.spacing), this.diskSize)].toggle()
            }
            var y = -( Math.pow(2 * this.writeCompletion - 1, 2)) + 1
            var target = this.head.originalPosition.clone().add(headSinkDepth)
            this.head.mesh.position.lerpVectors(this.head.originalPosition,target,y)
            if(this.writeCompletion >= 1)this.state = State.rolling;
        }
    }
}
