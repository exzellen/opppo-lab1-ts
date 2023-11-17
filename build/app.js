"use strict"
import Airplane from './classes/Airplane.js';
import Train from './classes/Train.js';
import Truck from './classes/Truck.js';

export const createAirplane = ([speed, distance, owner, rangeOfFlight, carrying]) =>
    new Airplane(+speed, +distance, owner, +rangeOfFlight, +carrying);

export const createTrain = ([speed, distance, owner, wagons]) =>
    new Train(+speed, +distance, owner, +wagons);

export const createTruck = ([speed, distance, owner, carrying, bodyCapacity]) =>
    new Truck(+speed, +distance, owner, +carrying, +bodyCapacity);

const isCreated = (obj) => Object.keys(obj).length;

export const checkArgs = (type, [speed, distance, owner, ...otherArgs]) => {
    const validArgs = {
        'Airplane': checkAirplaneArgs,
        'Train': checkTrainArgs,
        'Truck': checkTruckArgs
    }

    if (Number.isInteger(+speed) &&
        Number.isInteger(+distance) &&
        owner.length > 3) {
        if (type in validArgs) 
            return validArgs[type](otherArgs);
    }
    return false;
};

export const checkAirplaneArgs = (args) => (args.length == 2 && args.map(a => +a).every(Number.isInteger));

export const checkTrainArgs = (args) => args.length == 1 && Number.isInteger(+args[0]);

export const checkTruckArgs = (args) => args.length == 2 && Number.isInteger(+args[0])

export const parseCommands = (...str) => {
    let [commandName, ...commandArgs] = str;
    let newArgs = [];
    let itsJoinStr = false;

    commandArgs.forEach(arg => {
        if (itsJoinStr) {
            newArgs[newArgs.length - 1] += ' ' + arg;

            if (arg.endsWith("'")) 
                itsJoinStr = false;
            return;
        }
        if (arg.startsWith("'") && !arg.endsWith("'")) 
            itsJoinStr = true;

        newArgs.push(arg);
    });
    return [commandName, newArgs];
};

export const chooseObj = ([type, ...parameters]) => {
    const vehicle = {
        type: type,
        parameters: parameters
    };
    const transport = {
        "Airplane": createAirplane,
        "Train": createTrain,
        "Truck": createTruck
    };
    if (vehicle.type in transport) 
        return transport[vehicle.type](vehicle.parameters); 
    else console.log(`Неправильные аргументы у ${vehicle.type}: ${vehicle.parameters}\n`);
};

export const isTrue = (node, remArgs) => {
    const classes = ['Airplane', 'Train', 'Truck'];
    let field = 0, operand, expect, received;

    switch (remArgs.length){
        case 1: {
            const [remArg] = remArgs;
            if (remArg == 'all')
                return true;
            else if (classes.includes(remArg))
                return node.constructor.name == remArg;
            return false;
        };
        case 2: [operand, expect] = remArgs;
        case 3: [field, operand, expect] = remArgs;
    };

    if (field && field in node)
        received = node[field];
    else if (!field)
        received = node;
    else 
        return false;

    const operands = {
        "==" : received == expect,
        "!=" : received != expect,
        ">" : received > expect,
        ">=" : received >= expect,
        "<" : received < expect,
        "<=" : received <= expect
    }
    if (operand in operands)
        return operands[operand];
    return false; 
}

const print = (data) => {
    const out = document.getElementById("out");
    out.value += 'List:\n';

    data.forEach(item => {
        out.value += item.constructor.name + ': ' + JSON.stringify(item) + '\n';
    });
    out.value += '\n';
}

import input from "./dom.js"
import Circular from "./classes/Circular.js"
export function main() {
    const lines = input.value.split('\n');
    //const lines = openFile('in.txt').split('\n');
    let list = new Circular();
    let obj = {};
    const funcs = {
        "ADD": (commandArgs) => {
            obj = chooseObj(commandArgs);
            if (isCreated(obj)) 
                list.append(obj);
        },
        "REM": (commandArgs) => list = list.filter(node => !isTrue(node, commandArgs)),
        "PRINT": () => print(list) 
    };
    lines.forEach(line => {
        const command = {};
        [command.name, command.args] = parseCommands(...line.trim().split(' '));

        if (command.name in funcs)
            funcs[command.name](command.args);
        else console.log(`Неправильная команда: ${command.name}`);
    });
}
document.getElementById("btn").onclick = main;


export const openFile = (fileName) => {
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        const dataArray = data.split('\n'); 
        return dataArray;
    } catch (error) {
        throw new Error(`An error occurred while reading the file`);
    }
};