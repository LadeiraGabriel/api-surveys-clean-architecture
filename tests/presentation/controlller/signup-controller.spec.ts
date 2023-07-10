import type { Authentication } from '../../../src/domain/use-cases/Authentication'
import type { AddAccount } from '../../../src/domain/use-cases/add-account'
import { SignUpController } from '../../../src/presentation/controllers/SignUp-controller'
import {
  InvalidParamError,
  MissingParamError,
  ServerError
} from '../../../src/presentation/errors'
import { EmailInUsedError } from '../../../src/presentation/errors/Email-in-used-error'
import { serverError } from '../../../src/presentation/helpers/http-helper'
import type { Validation } from '../../../src/presentation/protocols/validation'
import type { EmailValitor } from '../../../src/validations/protocols'
import {
  mockAddAccountStub,
  mockAuthenticationStub,
  mockEmailValitorStub,
  mockValidationStub
} from '../mocks'

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
  emailValitorStub: EmailValitor
  addAccountStub: AddAccount
  authentication: Authentication
}

const makeSut = (): SutType => {
  const validationStub = mockValidationStub()
  const emailValitorStub = mockEmailValitorStub()
  const addAccountStub = mockAddAccountStub()
  const authentication = mockAuthenticationStub()
  const sut = new SignUpController(
    validationStub,
    emailValitorStub,
    addAccountStub,
    authentication
  )
  return {
    sut,
    validationStub,
    emailValitorStub,
    addAccountStub,
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

  test('Should return 400 if name not is provided', async () => {
    const request = mockFakeRequest()
    request.name = ''
    const { sut } = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if email not is provided', async () => {
    const request = mockFakeRequest()
    request.email = ''
    const { sut } = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if password not is provided', async () => {
    const request = mockFakeRequest()
    request.password = ''
    const { sut } = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if password confirmation not is provided', async () => {
    const request = mockFakeRequest()
    request.passwordConfirmation = ''
    const { sut } = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation')
    )
  })

  test('Should return 400 if email is invalid', async () => {
    const request = mockFakeRequest()
    request.email = 'invalid_email'
    const { sut, emailValitorStub } = makeSut()
    jest.spyOn(emailValitorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct value', async () => {
    const { sut, emailValitorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValitorStub, 'isValid')
    await sut.handle(mockFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValitorStub } = makeSut()
    jest.spyOn(emailValitorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.body).toEqual(new ServerError(new Error().stack))
  })

  test('Should return 400 if password Confirmation is incorrect', async () => {
    const request = mockFakeRequest()
    request.passwordConfirmation = 'incorrect_password'
    const { sut } = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation')
    )
  })

  test('Should call addAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    })
  })

  test('Should return 500 if addAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if addAccount is false', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return Promise.resolve(false)
    })
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.body).toEqual(new EmailInUsedError())
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
