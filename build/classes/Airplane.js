import Transport from './Transport.js';
export default class Airplane extends Transport {
    constructor(speed = 0, distance = 0, owner = '', rangeOfFlight = 0, carrying = 0) {
        super(speed, distance, owner);
        this.rangeOfFlight = rangeOfFlight;
        this.carrying = carrying;
    }
}
