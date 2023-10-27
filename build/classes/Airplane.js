import Transport from './Transport.js';
export default class Airplane extends Transport {
    constructor(speed = 0, distance = 0, owner = '', _rangeOfFlight = 0, _carrying = 0) {
        super(speed, distance, owner);
        this._rangeOfFlight = _rangeOfFlight;
        this._carrying = _carrying;
    }
}
