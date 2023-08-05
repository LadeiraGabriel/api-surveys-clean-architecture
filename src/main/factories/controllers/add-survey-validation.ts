import { RequiredFieldsValidation, ValidationComposite } from '../../../validations/validators'

export const makeAddSurveyValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldsValidation('question'),
    new RequiredFieldsValidation('anwers')
  ])
}
