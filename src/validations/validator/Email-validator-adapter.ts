import type { EmailValitor } from './../protocols/email-validator'
import validator from 'validator'
export class EmailValidatorApdater implements EmailValitor {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
