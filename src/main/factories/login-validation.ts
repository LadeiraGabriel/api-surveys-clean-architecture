import { EmailValidatorApdater } from '../../infra/validators/Email-validator-adapter'
import { EmailValidation } from '../../validations/validators/email-validation'
import { RequiredFieldsValidation } from '../../validations/validators/required-field-validation'
import { ValidationComposite } from '../../validations/validators/validation-composite'

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldsValidation('email'),
    new RequiredFieldsValidation('password'),
    new EmailValidation(new EmailValidatorApdater())
  ])
}
