import type { Authentication } from '@/domain/use-cases'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http-helper'
import type { Validation } from '@/presentation/protocols'
import { mockAuthenticationSpy, mockValidationStub } from '@/tests/presentation/mocks'

type SutType = () => {
  sut: LoginController
  authenticationSpy: Authentication
  validationStub: Validation
}
const mockrequest = {
  email: 'any_email',
  password: 'any_password'
}
const makeSut: SutType = () => {
  const validationStub = mockValidationStub()
  const authenticationSpy = mockAuthenticationSpy()
  const sut = new LoginController(validationStub, authenticationSpy)
  return {
    sut,
    authenticationSpy,
    validationStub
  }
}

describe('Login controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const spyValidate = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockrequest)
    expect(spyValidate).toHaveBeenCalledWith(mockrequest)
  })

  test('Should return 400 if validation return at error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('password'))
    const httpResponse = await sut.handle(mockrequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const authSpy = jest.spyOn(authenticationSpy, 'auth')
    await sut.handle(mockrequest)
    expect(authSpy).toBeCalledWith(mockrequest)
  })

  test('Should return 401 if authentication return null', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(mockrequest)
    expect(response).toEqual(unauthorized())
  })

  test('Should return 500 if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
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
