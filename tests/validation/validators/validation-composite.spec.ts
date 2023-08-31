import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import type { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validations/validators'
import { mockValidationStub } from '@/tests/presentation/mocks'

type sutType = {
  sut: ValidationComposite
  valitionStubs: Validation[]
}

const makeSut = (): sutType => {
  const valitionStubs = [mockValidationStub(), mockValidationStub()]
  const sut = new ValidationComposite(valitionStubs)
  return {
    sut,
    valitionStubs
  }
}

describe('Validation Composite', () => {
  test('Should call validation with correct values', () => {
    const fields = {
      name: 'any_name',
      email: 'any_email'
    }
    const { sut, valitionStubs } = makeSut()
    const validateSpy = jest.spyOn(valitionStubs[0], 'validate')
    sut.validate(fields)
    expect(validateSpy).toHaveBeenCalledWith(fields)
  })

  test('should return the error of the first validation that returns an error', () => {
    const fields = {
      name: 'any_name',
      email: 'any_email'
    }
    const { sut, valitionStubs } = makeSut()
    jest.spyOn(valitionStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('name'))
    jest.spyOn(valitionStubs[1], 'validate').mockReturnValueOnce(new InvalidParamError('email'))
    const result = sut.validate(fields)
    expect(result).toEqual(new MissingParamError('name'))
  })

  test('should not return on success', () => {
    const fields = {
      name: 'any_name',
      email: 'any_email'
    }
    const { sut } = makeSut()
    const result = sut.validate(fields)
    expect(result).toBeFalsy()
  })
})
