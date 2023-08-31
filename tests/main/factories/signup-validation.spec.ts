import type { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validations/validators/validation-composite'
import { EmailValidatorApdater } from '@/infra/validators/Email-validator-adapter'
import { EmailValidation } from '@/validations/validators/email-validation'
import { RequiredFieldsValidation } from '@/validations/validators/required-field-validation'
import { CompareFieldsValidation } from '@/validations/validators/compare-fields-valition'
import { makeSignUpValidation } from '@/main/factories/controllers/signup-validations'

jest.mock('@/validations/validators/validation-composite')
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
