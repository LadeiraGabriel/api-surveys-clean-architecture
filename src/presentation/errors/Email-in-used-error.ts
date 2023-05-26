export class EmailInUsedError extends Error {
  constructor () {
    super('E-mail in used error')
    this.name = 'EmailInUsedError'
  }
}
