export class Unauthorized extends Error {
  constructor () {
    super('Unauthorized Error')
    this.name = 'UnauthorizedError'
  }
}
