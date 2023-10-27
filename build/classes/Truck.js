import Transport from './Transport.js';
export default class Truck extends Transport {
    constructor(speed = 0, distance = 0, owner = '', _carrying = 0, _bodyCapacity = 0) {
        super(speed, distance, owner);
        this._carrying = _carrying;
        this._bodyCapacity = _bodyCapacity;
    }
    getCapacity() {
        console.log(this._bodyCapacity);
    }
}
