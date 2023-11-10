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
export const checkArgs = (type, [speed, distance, owner, ...other]) => {
    const check = {
        'Airplane' : checkAirplaneArgs(other),
        'Train' : checkTrainArgs(other),
        'Truck' : checkTruckArgs(other)
    }

    if (Number.isInteger(+speed) &&
        Number.isInteger(+distance) &&
        typeof owner == 'string' &&
        owner.length > 3) {
            if (type in check) return check[type];
    }
    return false;
};

export const checkAirplaneArgs = (args) =>  {
    return (args.length == 2 && 
            Number.isInteger(+args[0]) && 
            Number.isInteger(+args[1]));
}

export const checkTrainArgs = (args) => args.length == 1 && Number.isInteger(+args[0]);

export const checkTruckArgs = (args) => args.length == 2 && Number.isInteger(+args[0])

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

    const doFunc = {
        "ADD" : (args) => {list.append(chooseObj(args));},
        "REM" : (args) => {list.delete(...args);},
        "PRINT" : () => {list.print();}
    };
    lines.forEach(line => {
        const command = {};
    
        [command.name, command.args] = parseCommands(line.trim());

        if (command.name in doFunc) 
            doFunc[command.name](command.args);
        else console.log(`Неправильная команда: ${command}`);
        
    });
    list.freeList();
}
document.getElementById("btn").onclick = main;


// export const openFile = (fileName) => {
//     try {
//         const data = fs.readFileSync(fileName, 'utf8');
//         const dataArray = data.split('\n'); 
//         return dataArray;
//     } catch (error) {
//         throw new Error(`An error occurred while reading the file`);
//     }
// };