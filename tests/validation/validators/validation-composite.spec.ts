import type { Validation } from '../../../src/presentation/protocols/validation'
import { ValidationComposite } from '../../../src/validations/validators/validation-composite'
import { mockValidationStub } from '../../presentation/mocks'

type sutType = {
  sut: ValidationComposite
  valitionStub: Validation
}

const makeSut = (): sutType => {
  const valitionStub = mockValidationStub()
  const sut = new ValidationComposite([valitionStub])
  return {
    sut,
    valitionStub
  }
}

describe('Validation Composite', () => {
  test('Should call validation with correct values', () => {
    const fields = {
      name: 'any_name',
      email: 'any_email'
    }
    const { sut, valitionStub } = makeSut()
    const validateSpy = jest.spyOn(valitionStub, 'validate')
    sut.validate(fields)
    expect(validateSpy).toHaveBeenCalledWith(fields)
  })
})
