import { MissingParamError } from '../../../src/presentation/errors'
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

  test('Should return missing param error if validation return error', () => {
    const fields = {
      name: 'any_name',
      email: 'any_email'
    }
    const { sut, valitionStub } = makeSut()
    jest.spyOn(valitionStub, 'validate').mockReturnValueOnce(new MissingParamError('email'))
    const result = sut.validate(fields)
    expect(result).toEqual(new MissingParamError('email'))
  })
})
