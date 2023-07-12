import { InvalidParamError } from '../../../src/presentation/errors'
import { CompareFieldsValidation } from '../../../src/validations/validators/compare-fields-valition'

describe('Compare fields validation', () => {
  test('Should return error if fields not is matched', () => {
    const input = {
      password: '1234',
      passwordConfimation: '12'
    }
    const sut = new CompareFieldsValidation('password', 'passwordConfirmation')
    const result = sut.validate(input)
    expect(result).toEqual(new InvalidParamError('passwordConfirmation'))
  })
})
