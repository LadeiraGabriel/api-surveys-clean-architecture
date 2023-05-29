import { EmailValidatorApdater } from '../../src/validations/validator/Email-validator-adapter'
import validator from 'validator'

describe('Email validator adapter', () => {
  jest.mock('validator', () => {
    return {
      isEmail: (email: string) => true
    }
  })
  test('Should return false if Validator return false', () => {
    const email = ' any_email'
    const sut = new EmailValidatorApdater()
    const isValid = sut.isValid(email)
    jest.spyOn(validator, 'isEmail').mockImplementation(() => {
      return false
    })
    expect(isValid).toBe(false)
  })
})
