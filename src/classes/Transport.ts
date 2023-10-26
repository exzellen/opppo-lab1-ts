export default abstract class Transport {
  constructor (
    private _speed: number = 0, 
    private _distance: number = 0, 
    private _owner: string = ''
  ) {  }
}