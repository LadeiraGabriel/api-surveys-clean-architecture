import { EmailValidatorApdater } from '../../validations/validators/Email-validator-adapter'
import { CompareFieldsValidation } from '../../validations/validators/compare-fields-valition'
import { EmailValidation } from '../../validations/validators/email-validation'
import { RequiredFieldsValidation } from '../../validations/validators/required-field-validation'
import { ValidationComposite } from '../../validations/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldsValidation('name'),
    new RequiredFieldsValidation('email'),
    new RequiredFieldsValidation('password'),
    new RequiredFieldsValidation('passwordConfirmation'),
    new EmailValidation(new EmailValidatorApdater()),
    new CompareFieldsValidation('password', 'passwordConfirmation')
  ])
}
