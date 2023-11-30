import type { LoadAccountByToken } from '@/domain/use-cases/load-account-by-token'
import type { AddAccount } from '@/domain/use-cases/add-account'
import type { Authentication } from '@/domain/use-cases/Authentication'

export class AddAccountSpy implements AddAccount {
  public account: AddAccount.Params
  public result = true
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.account = account
    return this.result
  }
}

export const mockAddAccountSpy = (): AddAccountSpy => {
  return new AddAccountSpy()
}

export const mockAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    public data: Authentication.Params
    public result = {
      name: 'any_name',
      accessToken: 'any_token'
    }

    async auth (data: Authentication.Params): Promise<Authentication.Result> {
      this.data = data
      return this.result
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    public accessToken: string
    public role: string
    public result = {
      id: 'any_id'
    }

    async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
      this.accessToken = accessToken
      this.role = role
      return Promise.resolve(this.result)
    }
  }

  return new LoadAccountByTokenStub()
}
