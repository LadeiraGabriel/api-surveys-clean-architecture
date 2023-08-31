import type { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validations/validators/validation-composite'
import { EmailValidatorApdater } from '@/infra/validators/Email-validator-adapter'
import { EmailValidation } from '@/validations/validators/email-validation'
import { RequiredFieldsValidation } from '@/validations/validators/required-field-validation'
import { makeLoginValidation } from '@/main/factories/controllers/login-validation'

jest.mock('@/validations/validators/validation-composite')
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
