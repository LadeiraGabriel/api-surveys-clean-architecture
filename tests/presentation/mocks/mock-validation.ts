import type { Validation } from '@/presentation/protocols/validation'
import type { EmailValitor } from '@/validations/protocols/email-validator'

export class EmailValidatorSpy implements EmailValitor {
  email: string
  result: boolean = true
  isValid (email: string): boolean {
    this.email = email
    return this.result
  }
}
export const mockEmailValitorSpy = (): EmailValitor => {
  return new EmailValidatorSpy()
}
export class ValidationSpy implements Validation {
  input: any
  result = null
  validate (input: any): Error {
    this.input = input
    return this.result
  }
}
export const mockValidationSpy = (): ValidationSpy => {
  return new ValidationSpy()
}
