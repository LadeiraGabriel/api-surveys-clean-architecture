import type { Authentication } from '../../../src/domain/use-cases'
import { LoginController } from '../../../src/presentation/controllers/login-controller'
import { ok, serverError, unauthorized } from '../../../src/presentation/helpers/http-helper'
import { mockAuthenticationStub } from '../mocks'

type SutType = () => {
  sut: LoginController
  authenticationStub: Authentication
}
const mockrequest = {
  email: 'any_email',
  password: 'any_password'
}
const makeSut: SutType = () => {
  const authenticationStub = mockAuthenticationStub()
  const sut = new LoginController(authenticationStub)
  return {
    sut,
    authenticationStub
  }
}

describe('Login controller', () => {
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