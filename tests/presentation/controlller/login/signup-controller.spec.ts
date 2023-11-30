import { SignUpController } from '@/presentation/controllers/login/SignUp-controller'
import type { Authentication } from '@/domain/use-cases/Authentication'
import {
  MissingParamError
} from '@/presentation/errors/Missing-param-error'
import { EmailInUsedError } from '@/presentation/errors/Email-in-used-error'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http-helper'
import type { Validation } from '@/presentation/protocols/validation'
import {
  mockAddAccountSpy,
  mockAuthenticationStub,
  mockValidationStub
} from '@/tests/presentation/mocks'
import type {
  AddAccountSpy
} from '@/tests/presentation/mocks'

type mockeFieldsAccount = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const mockFakeRequest = (): mockeFieldsAccount => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})

type SutType = {
  sut: SignUpController
  validationStub: Validation
  addAccountSpy: AddAccountSpy
  authentication: Authentication
}

const makeSut = (): SutType => {
  const validationStub = mockValidationStub()
  const addAccountSpy = mockAddAccountSpy()
  const authentication = mockAuthenticationStub()
  const sut = new SignUpController(
    validationStub,
    addAccountSpy,
    authentication
  )
  return {
    sut,
    validationStub,
    addAccountSpy,
    authentication
  }
}
describe('SignUp Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = mockFakeRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  test('Should return 400 if validation return at error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('email'))
    const request = mockFakeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should call addAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    await sut.handle(mockFakeRequest())
    expect(addAccountSpy.account).toEqual({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    })
  })

  test('Should return 500 if addAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if addAccount is false', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result = false
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUsedError()))
  })

  test('Should call Authantication with correct values', async () => {
    const { sut, authentication } = makeSut()
    const authApy = jest.spyOn(authentication, 'auth')
    await sut.handle(mockFakeRequest())
    expect(authApy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password'
    })
  })

  test('Should return 500 if Authantication throws', async () => {
    const { sut, authentication } = makeSut()
    jest.spyOn(authentication, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      name: 'any_name',
      accessToken: 'any_token'
    })
  })
})
