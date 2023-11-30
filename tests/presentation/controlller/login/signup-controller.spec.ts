import { SignUpController } from '@/presentation/controllers/login/SignUp-controller'
import {
  MissingParamError
} from '@/presentation/errors/Missing-param-error'
import { EmailInUsedError } from '@/presentation/errors/Email-in-used-error'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import {
  mockAddAccountSpy,
  mockAuthenticationSpy,
  mockValidationSpy
} from '@/tests/presentation/mocks'
import type {
  AddAccountSpy,
  AuthenticationSpy,
  ValidationSpy
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
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutType => {
  const validationSpy = mockValidationSpy()
  const addAccountSpy = mockAddAccountSpy()
  const authenticationSpy = mockAuthenticationSpy()
  const sut = new SignUpController(
    validationSpy,
    addAccountSpy,
    authenticationSpy
  )
  return {
    sut,
    validationSpy,
    addAccountSpy,
    authenticationSpy
  }
}
describe('SignUp Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    const request = mockFakeRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  test('Should return 400 if validation return at error', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('email'))
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
    const { sut, authenticationSpy } = makeSut()
    await sut.handle(mockFakeRequest())
    expect(authenticationSpy.data).toEqual({
      email: 'any_email',
      password: 'any_password'
    })
  })

  test('Should return 500 if Authantication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(ok({
      name: 'any_name',
      accessToken: 'any_token'
    }))
  })
})
