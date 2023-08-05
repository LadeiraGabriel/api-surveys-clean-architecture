import type { Validation } from '../../../src/presentation/protocols'
import { ValidationComposite } from './../../../src/validations/validators/validation-composite'
import { EmailValidatorApdater } from './../../../src/infra/validators/Email-validator-adapter'
import { EmailValidation } from '../../../src/validations/validators/email-validation'
import { RequiredFieldsValidation } from '../../../src/validations/validators/required-field-validation'
import { makeLoginValidation } from '../../../src/main/factories/controllers/login-validation'

jest.mock('./../../../src/validations/validators/validation-composite')
describe('Login validation', () => {
  test('Should call valitionComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = [
      new RequiredFieldsValidation('email'),
      new RequiredFieldsValidation('password'),
      new EmailValidation(new EmailValidatorApdater())
    ]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
