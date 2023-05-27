import type { Authentication } from '../../../src/domain/use-cases/Authentication'

export const mockAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (data: Authentication.Params): Promise<Authentication.Result> {
      return Promise.resolve({
        name: 'any_name',
        acessToken: 'any_token'
      })
    }
  }
  return new AuthenticationStub()
}
