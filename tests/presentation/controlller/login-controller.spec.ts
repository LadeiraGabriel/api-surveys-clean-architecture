import type { Authentication } from '../../../src/domain/use-cases'
import { LoginController } from '../../../src/presentation/controllers/login-controller'

describe('Login controller', () => {
  test('Should call authentication with correct values', async () => {
    class AuthenticationStub implements Authentication {
      async auth (data: Authentication.Params): Promise<Authentication.Result> {
        return Promise.resolve({
          name: 'any_name',
          acessToken: 'any_token'
        })
      }
    }
    const request = {
      email: 'any_email',
      password: 'any_password'
    }

    const authenticationStub = new AuthenticationStub()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const sut = new LoginController(authenticationStub)
    await sut.handle(request)
    expect(authSpy).toBeCalledWith(request)
  })
})
