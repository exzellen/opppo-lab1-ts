import {chooseObj, checkArgs, parseCommands} from '../build/app.js'
import Airplane from '../build/classes/Airplane.js';
import Train from '../build/classes/Train.js';
import Truck from '../build/classes/Truck.js';
import List from '../build/classes/List.js';

describe ('Test app.ts', () => {
  const air = new Airplane(1, 2, 'aa bb', 3, 4);
  const train = new Train(1, 2, 'aa bb', 3);
  const truck = new Truck(1, 2, 'aa bb', 3, 4.1);

  const airArgs = ['Airplane', '1', '2', 'aa bb', '3', '4'];
  const trainArgs = ['Train', '1', '2', 'aa bb', '3'];
  const truckArgs = ['Truck', '1', '2', 'aa bb', '3', '4.1'];
  
  const fakeAirArgs = ['Airplane', '1.1', '2.1', 'aa bb', '3.1', '4.1'];
  const fakeTrainArgs = ['Train', '1.1', '2.1', 'aa bb', '3.1'];
  const fakeTruckArgs = ['Truck', '1.1', '2.1', 'aa bb', '3.1', '4'];

  // test('Test createAirplane', () => {
  //   expect(createAirplane(airArgs)).toEqual(air);
  // });
  
  // test('Test createTrain', () => {
  //   expect(createTrain(trainArgs)).toEqual(train);
  // });

  // test('Test createTruck', () => {
  //   expect(createTruck(truckArgs)).toEqual(truck);
  // });
  

  test('Test chooseObj, create<Airplane, Train, Truck>', () => {
    expect(chooseObj(airArgs)).toEqual(air);
    expect(chooseObj(trainArgs)).toEqual(train);
    expect(chooseObj(truckArgs)).toEqual(truck);
  });
  
  test('Test parseCommands', () => {
    expect(parseCommands(`ADD Train 1 2 'Ivan Ivanov' 3`))
      .toEqual(['ADD', [`Train`, `1`, `2`, `'Ivan Ivanov'`, `3`]]);
  });

  test('Test checkArgs', () => {
    expect(checkArgs('Airplane', airArgs.slice(1))).toBeTruthy();
    expect(checkArgs('Train', trainArgs.slice(1))).toBeTruthy();
    expect(checkArgs('Truck', truckArgs.slice(1))).toBeTruthy();

    expect(checkArgs('Airplane', fakeAirArgs.slice(1))).toBeFalsy();
    expect(checkArgs('Train', fakeTrainArgs.slice(1))).toBeFalsy();
    expect(checkArgs('Truck', fakeTruckArgs.slice(1))).toBeFalsy();
  });


});

describe ('Test List.js', () => {
  let list = new List();
  const objs = [
    {id: 1, value: 1},
    {id: 2, value: 2},
    {id: 3, value: 1},
    {id: 4, value: 1},
    {id: 5, value: 1},
    {id: 6, value: 2},
    {id: 7, value: 1},
  ];
  //objs.forEach(obj => list.append(obj));

  let list2 = new List();
  const addNode = {id: 1, value: 1};
  const addNode2 = {id: 2, value: 2};
  list2.append(addNode);

  test('Test append', () => {
    expect(list).not.toEqual(list2);
    expect(list.append(addNode)).toEqual(list2);
    expect(list.tail.data == addNode).toBeTruthy();
    expect(list.head.data == addNode).toBeTruthy();
    expect(list.head.next == list.tail).toBeTruthy();

    list.append(addNode2);
    expect(list.head.data == addNode).toBeTruthy();
    expect(list.tail.data == addNode2).toBeTruthy();
    expect(list.head.next.data == addNode2).toBeTruthy();
  });

})