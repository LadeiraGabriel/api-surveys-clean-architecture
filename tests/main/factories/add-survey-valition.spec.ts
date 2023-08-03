import type { Validation } from '../../../src/presentation/protocols'
import { ValidationComposite } from '../../../src/validations/validators/validation-composite'
import { RequiredFieldsValidation } from '../../../src/validations/validators/required-field-validation'
import { makeAddSurveyValidation } from '../../../src/main/factories/add-survey-validation'

jest.mock('./../../../src/validations/validators/validation-composite')
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
