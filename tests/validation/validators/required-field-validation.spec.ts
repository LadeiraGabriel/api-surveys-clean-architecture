import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldsValidation } from '@/validations/validators'

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
