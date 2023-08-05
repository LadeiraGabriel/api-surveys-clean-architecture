import type { Validation } from '../../../src/presentation/protocols'
import { ValidationComposite } from './../../../src/validations/validators/validation-composite'
import { EmailValidatorApdater } from './../../../src/infra/validators/Email-validator-adapter'
import { EmailValidation } from '../../../src/validations/validators/email-validation'
import { RequiredFieldsValidation } from '../../../src/validations/validators/required-field-validation'
import { CompareFieldsValidation } from '../../../src/validations/validators/compare-fields-valition'
import { makeSignUpValidation } from '../../../src/main/factories/controllers/signup-validations'

jest.mock('./../../../src/validations/validators/validation-composite')
describe('Signup validation', () => {
  test('Should call valitionComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = [
      new RequiredFieldsValidation('name'),
      new RequiredFieldsValidation('email'),
      new RequiredFieldsValidation('password'),
      new RequiredFieldsValidation('passwordConfirmation'),
      new EmailValidation(new EmailValidatorApdater()),
      new CompareFieldsValidation('password', 'passwordConfirmation')
    ]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
