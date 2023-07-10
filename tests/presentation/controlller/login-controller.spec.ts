import type { Authentication } from '../../../src/domain/use-cases'
import { LoginController } from '../../../src/presentation/controllers/login-controller'
import { MissingParamError } from '../../../src/presentation/errors'
import { badRequest, ok, serverError, unauthorized } from '../../../src/presentation/helpers/http-helper'
import type { EmailValitor } from '../../../src/validations/protocols'
import { mockAuthenticationStub, mockEmailValitorStub } from '../mocks'

type SutType = () => {
  sut: LoginController
  authenticationStub: Authentication
  emailValidatorStub: EmailValitor
}
const mockrequest = {
  email: 'any_email',
  password: 'any_password'
}
const makeSut: SutType = () => {
  const emailValidatorStub = mockEmailValitorStub()
  const authenticationStub = mockAuthenticationStub()
  const sut = new LoginController(emailValidatorStub, authenticationStub)
  return {
    sut,
    authenticationStub,
    emailValidatorStub
  }
}

describe('Login controller', () => {
  test('Should return 400 if email not is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ password: 'any_password' })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if password not is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ email: 'any_email' })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should call email validator with correct values', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(mockrequest)
    expect(isValidSpy).toBeCalledWith(mockrequest.email)
  })

  test('Should call authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockrequest)
    expect(authSpy).toBeCalledWith(mockrequest)
  })

  test('Should return 401 if authentication return null', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(mockrequest)
    expect(response).toEqual(unauthorized())
  })

  test('Should return 500 if authentication fails', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle(mockrequest)
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockrequest)
    expect(httpResponse).toEqual(ok({ name: 'any_name', accessToken: 'any_token' }))
  })
})
