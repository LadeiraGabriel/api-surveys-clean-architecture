import type { EmailValitor } from '../../../src/presentation/protocols'

export const makeEmailValitorStub = (): EmailValitor => {
  class EmailValidatorStub implements EmailValitor {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
