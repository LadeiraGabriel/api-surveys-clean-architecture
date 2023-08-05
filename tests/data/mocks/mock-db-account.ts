import type {
  CheckAccounByEmailRepository,
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository, LoadAccountByTokenRepository
} from '../../../src/data/protocols/db/account'

export class CheckAccounByEmailRepositoryStub implements CheckAccounByEmailRepository {
  async checkByEmail (email: CheckAccounByEmailRepository.Params): Promise<CheckAccounByEmailRepository.Result> {
    return Promise.resolve(false)
  }
}

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    return Promise.resolve(true)
  }
}

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail (plainText: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
    return Promise.resolve({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_hash',
      token: 'any_token'
    })
  }
}

export class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
  async update (plainText: string): Promise<void> {
    return Promise.resolve(null)
  }
}

export const mockLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadAccountByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
      return Promise.resolve({ id: 'any_id' })
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}
