import { InvalidParamError } from '@/presentation/errors'
import { EmailValidation } from '@/validations/validators'
import { mockEmailValitorSpy } from '@/tests/validation/mocks/mock-email-validator'

describe('Email Validation', () => {
  test('Should call email validator with correct value', () => {
    const input = {
      email: 'any_email'
    }
    const emailValidatorSpy = mockEmailValitorSpy()
    const sut = new EmailValidation(emailValidatorSpy)
    sut.validate(input)
    expect(emailValidatorSpy.email).toEqual(input.email)
  })

  test('Should return InvalidParamError if email validator return false', () => {
    const input = {
      email: 'any_email'
    }
    const emailValidatorSpy = mockEmailValitorSpy()
    emailValidatorSpy.result = false
    const sut = new EmailValidation(emailValidatorSpy)
    const result = sut.validate(input)
    expect(result).toEqual(new InvalidParamError('email'))
  })
})
