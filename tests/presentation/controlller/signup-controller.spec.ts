import { SignUpController } from '../../../src/presentation/controllers/SignUp-controller'
import { InvalidParamError } from '../../../src/presentation/errors/Invalid-param-error'
import { MissingParamError } from '../../../src/presentation/errors/Missing-param-error'
import type { EmailValitor } from '../../../src/presentation/protocols/email-validator'

type SutType = {
  sut: SignUpController
  emailValitorStub: EmailValitor
}

const makeSut = (): SutType => {
  class EmailValidatorStub implements EmailValitor {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValitorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValitorStub)
  return {
    sut,
    emailValitorStub
  }
}
describe('SignUp Controller', () => {
  test('Should return 400 if name not is provided', () => {
    const request = {
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const { sut } = makeSut()
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if email not is provided', () => {
    const request = {
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const { sut } = makeSut()
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if password not is provided', () => {
    const request = {
      name: 'any_name',
      email: 'any_email',
      passwordConfirmation: 'any_password'
    }
    const { sut } = makeSut()
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if password confirmation not is provided', () => {
    const request = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const { sut } = makeSut()
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if email is invalid', () => {
    const request = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const { sut, emailValitorStub } = makeSut()
    jest.spyOn(emailValitorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})
