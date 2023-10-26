import Airplane from './classes/Airplane.js';
import List from './classes/List.js';
import Train from './classes/Train.js';
import Truck from './classes/Truck.js';

import * as fs from 'fs';

export const createAirplane = ([
	speed,
	distance,
	owner,
	rangeOfFlight,
	carrying,
]: string[]): Airplane => {
	return new Airplane(+speed, +distance, owner, +rangeOfFlight, +carrying);
};

export const createTrain = ([
	speed,
	distance,
	owner,
	wagons,
]: string[]): Train => {
	return new Train(+speed, +distance, owner, +wagons);
};

export const createTruck = ([
	speed,
	distance,
	owner,
	carrying,
	bodyCapacity,
]: string[]): Truck => {
	return new Truck(+speed, +distance, owner, +carrying, +bodyCapacity);
};

export const openFile = (fileName: string): string[] => {
	try {
		const data = fs.readFileSync(fileName, 'utf8');
		const dataArray = data.split('\n'); // Разделяем строку на массив строк
		return dataArray;
	} catch (error) {
		throw new Error(`An error occurred while reading the file`);
	}
};

export const checkArgs = (
	type: string,
	[speed, distance, owner, ...other]: string[]
): boolean => {
	if (
		Number.isInteger(+speed) &&
		Number.isInteger(+distance) &&
		owner.length > 3
	) {
		if (
			(type == 'Airplane' &&
				other.length == 2 &&
				Number.isInteger(+other[0]) &&
				Number.isInteger(+other[1])) ||
			(type == 'Train' && other.length == 1 && Number.isInteger(+other[0])) ||
			(type == 'Truck' && other.length == 2 && Number.isInteger(+other[0]))
		)
			return true;
	}
	return false;
};

export const parseCommands = (str: string): [string, string[]] => {
	const words = str.split(' ');

	const command = words[0];
	let args = words.slice(1);

	if (command == 'ADD') {
		let count = 0; //кол-во объединяемых строк owner
		for (let i = 3; i < args.length; i++) {
			if (args[i].endsWith("'")) break;
			count++;
		}

		args[3] = args.slice(3, count + 3 + 1).join(' ');
		args.splice(4, count);
	}
	return [command, args];
};

export const chooseObj = (args: string[]): object => {
	const type: string = args[0];
	let obj = {};

	args = args.slice(1);

	if (checkArgs(type, args)) {
		if (type == 'Airplane') obj = createAirplane(args);
		else if (type == 'Train') obj = createTrain(args);
		else if (type == 'Truck') obj = createTruck(args);
	} else console.log(`Неправильные аргументы у ${type}`);
	return obj;
};

export function main(): void {
	const lines: string[] = openFile('../in.txt');
	const list = new List();

	lines.forEach(line => {
		let command: string;
		let args: string[];
		let obj = {};

		[command, args] = parseCommands(line.trim());
		console.log(command, args);
		if (command == 'ADD') {
			obj = chooseObj(args);

			if (Object.keys(obj).length) list.append(obj);
		} 
		else if (command == 'REM') list.delete(...args);
		else if (command == 'PRINT') list.print();
		else console.log('Неизвестная команда');
	});
}
main();
