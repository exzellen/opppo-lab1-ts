import Transport from './Transport.js';
export default class Train extends Transport {
    constructor(speed = 0, distance = 0, owner = '', _wagons = 0) {
        super(speed, distance, owner);
        this._wagons = _wagons;
    }
    get wagons() {
        return this._wagons;
    }
}
