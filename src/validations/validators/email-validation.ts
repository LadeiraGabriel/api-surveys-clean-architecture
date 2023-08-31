import { InvalidParamError } from '@/presentation/errors'
import type { Validation } from '@/presentation/protocols/validation'
import type { EmailValitor } from '@/validations/protocols'

export class EmailValidation implements Validation {
  constructor (private readonly emailValidator: EmailValitor) {}
  validate (input: any): Error {
    const emailIsValid = this.emailValidator.isValid(input.email)
    if (!emailIsValid) {
      return new InvalidParamError('email')
    }
  }
}
