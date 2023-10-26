import Transport from './Transport.js';

export default class Train extends Transport {
	constructor(
		speed: number = 0,
		distance: number = 0,
		owner: string = '',
		private _wagons: number = 0
	) {
		super(speed, distance, owner);
	}

	public get wagons() {
		return this._wagons;
	}
}
