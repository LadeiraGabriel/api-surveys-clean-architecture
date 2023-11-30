import type { LoadAccountByToken } from '@/domain/use-cases/load-account-by-token'
import type { AddAccount } from '@/domain/use-cases/add-account'
import type { Authentication } from '@/domain/use-cases/Authentication'

export class AddAccountSpy implements AddAccount {
  account: AddAccount.Params
  result = true
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.account = account
    return this.result
  }
}

export const mockAddAccountSpy = (): AddAccountSpy => {
  return new AddAccountSpy()
}

export class AuthenticationSpy implements Authentication {
  data: Authentication.Params
  result = {
    name: 'any_name',
    accessToken: 'any_token'
  }

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    this.data = data
    return this.result
  }
}

export const mockAuthenticationSpy = (): AuthenticationSpy => {
  return new AuthenticationSpy()
}
export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role: string
  result = {
    id: 'any_id'
  }

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return Promise.resolve(this.result)
  }
}

export const mockLoadAccountByTokenSpy = (): LoadAccountByTokenSpy => {
  return new LoadAccountByTokenSpy()
}
