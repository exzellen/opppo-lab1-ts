import Transport from './Transport.js';
export default class Truck extends Transport {
    constructor(speed = 0, distance = 0, owner = '', carrying = 0, bodyCapacity = 0) {
        super(speed, distance, owner);
        this.carrying = carrying;
        this.bodyCapacity = bodyCapacity;
    }
}
