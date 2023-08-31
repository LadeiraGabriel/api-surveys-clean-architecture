import type { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validations/validators/validation-composite'
import { RequiredFieldsValidation } from '@/validations/validators/required-field-validation'
import { makeAddSurveyValidation } from '@/main/factories/controllers/add-survey-validation'

jest.mock('@/validations/validators/validation-composite')
describe('Add Survey validation', () => {
  test('Should call valitionComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = [
      new RequiredFieldsValidation('question'),
      new RequiredFieldsValidation('anwers')
    ]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
