import { MissingParamError } from '../../../src/presentation/errors'
import { RequiredFieldsValidation } from '../../../src/validations/validators/required-field-validation'

const makeSut = (): RequiredFieldsValidation => {
  return new RequiredFieldsValidation('email')
}

describe('Required field validation', () => {
  test('should return error if required fields are empty', () => {
    const sut = makeSut()
    const result = sut.validate('')
    expect(result).toEqual(new MissingParamError('email'))
  })
})
