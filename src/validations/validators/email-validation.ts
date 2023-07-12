import type { Validation } from '../../presentation/protocols/validation'
import type { EmailValitor } from '../protocols'

export class EmailValidation implements Validation {
  constructor (private readonly emailValidator: EmailValitor) {}
  validate (input: any): Error {
    this.emailValidator.isValid(input.email)
    return new Error()
  }
}
