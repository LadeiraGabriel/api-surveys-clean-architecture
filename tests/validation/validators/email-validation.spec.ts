import { EmailValidation } from '../../../src/validations/validators/email-validation'
import { mockEmailValitorStub } from '../mocks/mock-email-validator'

describe('Email Validation', () => {
  test('Should call email validator with correct value', () => {
    const input = {
      email: 'any_email'
    }
    const emailValidatorStub = mockEmailValitorStub()
    const spyIsValid = jest.spyOn(emailValidatorStub, 'isValid')
    const sut = new EmailValidation(emailValidatorStub)
    sut.validate(input)
    expect(spyIsValid).toHaveBeenCalledWith(input.email)
  })
})
