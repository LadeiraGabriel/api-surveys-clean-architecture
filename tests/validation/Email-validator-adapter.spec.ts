import { EmailValidatorApdater } from '../../src/validations/validators/Email-validator-adapter'
import type { EmailValitor } from '../../src/validations/protocols'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValitor => {
  return new EmailValidatorApdater()
}

describe('Email validator adapter', () => {
  test('Should return false if Validator return false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('any_email')
    expect(isValid).toBe(false)
  })

  test('Should return true if Validator return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('any_email')
    expect(isValid).toBe(true)
  })

  test('Should call Validator with correct values', () => {
    const sut = makeSut()
    sut.isValid('any_email')
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email')
  })
})
