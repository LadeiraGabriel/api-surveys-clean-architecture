import type { EmailValitor } from '../../../src/validations/protocols/email-validator'
export const mockEmailValitorStub = (): EmailValitor => {
  class EmailValidatorStub implements EmailValitor {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}