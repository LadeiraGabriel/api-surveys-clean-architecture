import type { AddAccount } from '../../../src/domain/account/use-cases/add-account'
import { SignUpController } from '../../../src/presentation/controllers/SignUp-controller'
import { InvalidParamError, MissingParamError, ServerError } from '../../../src/presentation/errors'
import { EmailInUsedError } from '../../../src/presentation/errors/Email-in-used-error'
import type { EmailValitor } from '../../../src/validations/protocols'
import { mockAddAccountStub } from '../mocks/account/add-account-stub'
import { mockEmailValitorStub } from '../mocks/email-validator-stub'

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
  emailValitorStub: EmailValitor
  addAccountStub: AddAccount
}

const makeSut = (): SutType => {
  const emailValitorStub = mockEmailValitorStub()
  const addAccountStub = mockAddAccountStub()
  const sut = new SignUpController(emailValitorStub, addAccountStub)
  return {
    sut,
    emailValitorStub,
    addAccountStub
  }
}
describe('SignUp Controller', () => {
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
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
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
    const request = mockFakeRequest()
    const { sut, emailValitorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValitorStub, 'isValid')
    await sut.handle(request)
    expect(isValidSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const request = mockFakeRequest()
    const { sut, emailValitorStub } = makeSut()
    jest.spyOn(emailValitorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 400 if password Confirmation is incorrect', async () => {
    const request = mockFakeRequest()
    request.passwordConfirmation = 'incorrect_password'
    const { sut } = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should call addAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const request = mockFakeRequest()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith({ email: 'any_email', name: 'any_name', password: 'any_password' })
  })

  test('Should return 500 if addAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    const request = mockFakeRequest()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 403 if addAccount is false', async () => {
    const { sut, addAccountStub } = makeSut()
    const request = mockFakeRequest()

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return Promise.resolve(false)
    })
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.body).toEqual(new EmailInUsedError())
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const request = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      name: 'any_name',
      acessToken: 'any_token'
    })
  })
})
