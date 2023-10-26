import {parseCommands} from '../build/app.js'
describe ('Test app.ts', () => {
  test('Test parseCommands', ()=> {
    expect(parseCommands(`ADD Train 1 2 'Ivan Ivanov' 3`))
      .toEqual(['ADD', [`Train`, `1`, `2`, `'Ivan Ivanov'`, `3`]])
  })
})