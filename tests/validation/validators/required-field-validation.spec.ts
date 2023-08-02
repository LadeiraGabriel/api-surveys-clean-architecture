import { MissingParamError } from '../../../src/presentation/errors'
import { RequiredFieldsValidation } from '../../../src/validations/validators/required-field-validation'

const makeSut = (): RequiredFieldsValidation => {
  return new RequiredFieldsValidation('email')
}

describe('Required field validation', () => {
  test('should return missing param error if required fields are empty', () => {
    const input = {
      email: ''
    }
    const sut = makeSut()
    const result = sut.validate(input)
    expect(result).toEqual(new MissingParamError('email'))
  })
})
