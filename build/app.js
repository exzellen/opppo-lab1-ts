import Airplane from './classes/Airplane.js';
import List from './classes/List.js';
import Train from './classes/Train.js';
import Truck from './classes/Truck.js';

export const createAirplane = ([speed, distance, owner, rangeOfFlight, carrying]) => {
    return new Airplane(+speed, +distance, owner, +rangeOfFlight, +carrying);
};
export const createTrain = ([speed, distance, owner, wagons]) => {
    return new Train(+speed, +distance, owner, +wagons);
};
export const createTruck = ([speed, distance, owner, carrying, bodyCapacity]) => {
    return new Truck(+speed, +distance, owner, +carrying, +bodyCapacity);
};
// export const openFile = (fileName) => {
//     try {
//         const data = fs.readFileSync(fileName, 'utf8');
//         const dataArray = data.split('\n'); 
//         return dataArray;
//     } catch (error) {
//         throw new Error(`An error occurred while reading the file`);
//     }
// };
export const checkArgs = (type, [speed, distance, owner, ...other]) => {
    if (Number.isInteger(+speed) &&
        Number.isInteger(+distance) &&
        owner.length > 3) {
        if ((type == 'Airplane' &&
                other.length == 2 &&
                Number.isInteger(+other[0]) &&
                Number.isInteger(+other[1])) ||
            (type == 'Train' && other.length == 1 && Number.isInteger(+other[0])) ||
            (type == 'Truck' && other.length == 2 && Number.isInteger(+other[0])))
            return true;
    }
    return false;
};

export const checkAirplaneArgs = () => {
    
}
export const parseCommands = (str) => {
    const words = str.split(' ');
    const command = words[0];
    let args = words.slice(1);
    if (command == 'ADD') {
        let count = 0; //кол-во объединяемых строк owner
        for (let i = 3; i < args.length; i++) {
            if (args[i].endsWith("'"))
                break;
            count++;
        }
        args[3] = args.slice(3, count + 3 + 1).join(' ');
        args.splice(4, count);
    }
    return [command, args];
};
export const chooseObj = (args) => {
    const type = args[0];
    args = args.slice(1);
    let obj = {};
    if (checkArgs(type, args)) {
        if (type == 'Airplane')
            obj = createAirplane(args);
        else if (type == 'Train')
            obj = createTrain(args);
        else if (type == 'Truck')
            obj = createTruck(args);
    } else
        console.log(`Неправильные аргументы у ${type}`);
    return obj;
};

import lines from './dom.js'
export function main() {
    const list = new List();
    lines.forEach(line => {
        let command;
        let args;
        
        let obj = {};
        [command, args] = parseCommands(line.trim());
        if (command == 'ADD') {
            obj = chooseObj(args);
            if (Object.keys(obj).length)
                list.append(obj);
        } else if (command == 'REM')
            list.delete(...args);
        else if (command == 'PRINT')
            list.print();
        else
            console.log('Неизвестная команда');
    });
    list.freeList();
}
document.getElementById("btn").onclick = main;