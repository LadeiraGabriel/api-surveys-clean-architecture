import type { AddAccount } from '../../../src/domain/use-cases/account/add-account'
import type { Authentication } from '../../../src/domain/use-cases/Authentication'

export const mockAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccount.Params): Promise<AddAccount.Result> {
      return Promise.resolve(true)
    }
  }
  return new AddAccountStub()
}

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
