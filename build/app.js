import Airplane from './classes/Airplane.js';
import List from './classes/List.js';
import Train from './classes/Train.js';
import Truck from './classes/Truck.js';

export const createAirplane = ([speed, distance, owner, rangeOfFlight, carrying]) =>
    new Airplane(+speed, +distance, owner, +rangeOfFlight, +carrying);

export const createTrain = ([speed, distance, owner, wagons]) => 
    new Train(+speed, +distance, owner, +wagons);
    
export const createTruck = ([speed, distance, owner, carrying, bodyCapacity]) => 
    new Truck(+speed, +distance, owner, +carrying, +bodyCapacity);

export const checkArgs = (type, [speed, distance, owner, ...otherArgs]) => {
    const types = {
        'Airplane' : checkAirplaneArgs,
        'Train' : checkTrainArgs,
        'Truck' : checkTruckArgs
    }

    if (Number.isInteger(+speed) &&
        Number.isInteger(+distance) &&
        owner.length > 3) {
            if (type in types) return types[type](otherArgs);
    }
    return false;
};

export const checkAirplaneArgs = (args) => (args.length == 2 && args.map(a => +a).every(Number.isInteger));

export const checkTrainArgs = (args) => args.length == 1 && Number.isInteger(+args[0]);

export const checkTruckArgs = (args) => args.length == 2 && Number.isInteger(+args[0])

export const parseCommands = (...str) => {
    const [command, ...args] = str;
    const newArgs = [];
    let itsJoinStr = false;
  
    if (command == 'ADD') {
      args.forEach(arg => {
        if (itsJoinStr){
          newArgs[newArgs.length - 1] += ' ' + arg;
  
          if (arg.endsWith("'")) itsJoinStr = false;
          return;
        }
          
        if (arg.startsWith("'")) itsJoinStr = true;
      
        newArgs.push(arg);   
      });
    }
    return [command, newArgs];
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
    
        [command.name, command.args] = parseCommands(...line.trim().split(' '));

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