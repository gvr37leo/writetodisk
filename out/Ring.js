/// <reference path="Bit.ts" />
/// <reference path="Head.ts" />
/// <reference path="../node_modules/utilsx/utils.js" />
var State;
(function (State) {
    State[State["rolling"] = 0] = "rolling";
    State[State["writing"] = 1] = "writing";
})(State || (State = {}));
var Ring = (function () {
    function Ring(diskSize, radius) {
        this.flag = false;
        this.state = State.rolling;
        this.bits = [];
        this.diskSize = diskSize;
        this.spacing = Math.PI * 2 / diskSize;
        for (var i = 0; i < diskSize; i++) {
            var pos = new THREE.Vector3(0, -radius, 1);
            pos.applyAxisAngle(new THREE.Vector3(0, 0, 1), i * this.spacing);
            this.bits.push(new Bit(pos));
        }
        this.rotationSpeed = 0.01;
        this.currentRotation = 0;
        this.targetRotation = this.spacing * 10;
        this.head = new Head(new THREE.Vector3(0, -radius, 3));
    }
    Ring.prototype.update = function () {
        if (this.state == State.rolling) {
            var step = min(this.rotationSpeed, Math.abs(this.targetRotation - this.currentRotation));
            if (this.targetRotation < this.currentRotation)
                step = -step;
            this.currentRotation += step;
            for (var _i = 0, _a = this.bits; _i < _a.length; _i++) {
                var bit = _a[_i];
                bit.mesh.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), step);
            }
            if (step == 0) {
                var randomness = Math.floor(random(20, 40));
                if (this.flag)
                    this.targetRotation += this.spacing * randomness;
                else
                    this.targetRotation -= this.spacing * randomness;
                this.flag = !this.flag;
                this.state = State.writing;
                this.writeCompletion = 0;
            }
        }
        else if (this.state == State.writing) {
            this.writeCompletion += 0.02;
            if (floatEquals(this.writeCompletion, 0.5)) {
                this.bits[mod(Math.round(-this.currentRotation / this.spacing), this.diskSize)].toggle();
            }
            var y = -(Math.pow(2 * this.writeCompletion - 1, 2)) + 1;
            var target = this.head.originalPosition.clone().add(headSinkDepth);
            this.head.mesh.position.lerpVectors(this.head.originalPosition, target, y);
            if (this.writeCompletion >= 1)
                this.state = State.rolling;
        }
    };
    return Ring;
})();
//# sourceMappingURL=Ring.js.map