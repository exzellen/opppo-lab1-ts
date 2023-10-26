import Transport from './Transport.js';

export default class Airplane extends Transport {
	constructor(
		speed: number = 0,
		distance: number = 0,
		owner: string = '',
		private _rangeOfFlight: number = 0,
		private _carrying: number = 0
	) {
		super(speed, distance, owner);
	}
}
