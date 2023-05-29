import { EmailValidatorApdater } from '../../src/validations/validator/Email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('Email validator adapter', () => {
  test('Should return false if Validator return false', () => {
    const sut = new EmailValidatorApdater()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('any_email')
    expect(isValid).toBe(false)
  })

  test('Should return true if Validator return true', () => {
    const sut = new EmailValidatorApdater()
    const isValid = sut.isValid('any_email')
    expect(isValid).toBe(true)
  })

  test('Should call Validator with correct values', () => {
    const sut = new EmailValidatorApdater()
    sut.isValid('any_email')
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email')
  })
})
