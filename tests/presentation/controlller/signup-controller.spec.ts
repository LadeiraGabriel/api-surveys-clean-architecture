import { SignUpController } from '../../../src/presentation/controllers/SignUp-controller'
import { MissingParamError } from '../../../src/presentation/errors/Missing-param-error'
import { badRequest } from '../../../src/presentation/helpers/http-helper'
describe('SignUp Controller', () => {
  test('Should return 400 if name not is provided', () => {
    const request = {
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const sut = new SignUpController()
    const httpResponse = sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if email not is provided', () => {
    const request = {
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const sut = new SignUpController()
    const httpResponse = sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if password not is provided', () => {
    const request = {
      name: 'any_name',
      email: 'any_email',
      passwordConfirmation: 'any_password'
    }
    const sut = new SignUpController()
    const httpResponse = sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if password not is provided', () => {
    const request = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const sut = new SignUpController()
    const httpResponse = sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })
})
