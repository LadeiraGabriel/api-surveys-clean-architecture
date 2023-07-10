import type { Validation } from '../../../src/presentation/protocols/validation'
import type { EmailValitor } from '../../../src/validations/protocols/email-validator'

export const mockEmailValitorStub = (): EmailValitor => {
  class EmailValidatorStub implements EmailValitor {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

export const mockValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}
