import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '@/validations/validators'

describe('Compare fields validation', () => {
  test('Should return InvalidParamError if fields not is matched', () => {
    const input = {
      password: '1234',
      passwordConfimation: '12'
    }
    const sut = new CompareFieldsValidation('password', 'passwordConfirmation')
    const result = sut.validate(input)
    expect(result).toEqual(new InvalidParamError('passwordConfirmation'))
  })
})
