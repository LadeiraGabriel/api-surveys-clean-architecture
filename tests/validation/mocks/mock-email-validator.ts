import type { EmailValitor } from '@/validations/protocols/email-validator'

export class EmailValidatorSpy implements EmailValitor {
  email: string
  result: boolean
  isValid (email: string): boolean {
    this.email = email
    return this.result
  }
}

export const mockEmailValitorSpy = (): EmailValidatorSpy => {
  return new EmailValidatorSpy()
}
