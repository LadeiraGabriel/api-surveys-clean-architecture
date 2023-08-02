import { EmailValidatorApdater } from '../../infra/validators/Email-validator-adapter'
import { CompareFieldsValidation, EmailValidation, RequiredFieldsValidation, ValidationComposite } from '../../validations/validators/'

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
