import type { LoadAccountByToken } from '../../../src/domain/load-account-by-token'
import type { AddAccount } from '../../../src/domain/use-cases/add-account'
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
        accessToken: 'any_token'
      })
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
      return Promise.resolve(null)
    }
  }

  return new LoadAccountByTokenStub()
}
