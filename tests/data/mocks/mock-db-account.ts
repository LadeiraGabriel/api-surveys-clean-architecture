import type {
  CheckAccounByEmailRepository,
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository, LoadAccountByTokenRepository
} from '@/data/protocols/db/account'

export class CheckAccounByEmailRepositorySpy implements CheckAccounByEmailRepository {
  email: CheckAccounByEmailRepository.Params
  result = false
  async checkByEmail (email: CheckAccounByEmailRepository.Params): Promise<CheckAccounByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  account: AddAccountRepository.Params
  result = true
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.account = account
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  plainText: LoadAccountByEmailRepository.Params
  result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'any_hash',
    token: 'any_token'
  }

  async loadByEmail (plainText: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
    this.plainText = plainText
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  plainText: string
  result = null
  async update (plainText: string): Promise<void> {
    this.plainText = plainText
    return this.result
  }
}
export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  accessToken: string
  role?: string
  result = {
    id: 'any_id'
  }

  async loadAccountByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}
