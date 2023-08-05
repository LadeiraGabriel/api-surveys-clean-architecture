import { EmailValidatorApdater } from '../../../infra/validators/Email-validator-adapter'
import { EmailValidation, RequiredFieldsValidation, ValidationComposite } from '../../../validations/validators'

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldsValidation('email'),
    new RequiredFieldsValidation('password'),
    new EmailValidation(new EmailValidatorApdater())
  ])
}
