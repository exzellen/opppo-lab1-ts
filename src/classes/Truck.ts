import Transport from './Transport.js';

export default class Truck extends Transport {
	constructor(
		speed: number = 0,
		distance: number = 0,
		owner: string = '',
		private _carrying: number = 0,
		private _bodyCapacity: number = 0
	) {
		super(speed, distance, owner);
	}

	getCapacity() {
		console.log(this._bodyCapacity);
	}
}
