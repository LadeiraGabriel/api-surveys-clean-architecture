import type { Authentication } from '../../../src/domain/use-cases'
import { LoginController } from '../../../src/presentation/controllers/login-controller'
import { mockAuthenticationStub } from '../mocks'

type SutType = () => {
  sut: LoginController
  authenticationStub: Authentication
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
    const request = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(request)
    expect(authSpy).toBeCalledWith(request)
  })
})
