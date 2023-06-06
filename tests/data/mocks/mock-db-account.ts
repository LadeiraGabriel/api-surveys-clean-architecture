import type { CheckAccounByEmailRepository } from '../../../src/data/protocols/db/account/check-account-by-email-repository'
import type { AddAccountRepository } from '../../../src/data/protocols/db/account/add-account-repository'
import type { LoadAccountByEmailRepository } from '../../../src/data/protocols/db/account/load-by-email-repository'

export class CheckAccounByEmailRepositoryStub implements CheckAccounByEmailRepository {
  async checkByEmail (email: CheckAccounByEmailRepository.Params): Promise<CheckAccounByEmailRepository.Result> {
    return Promise.resolve(true)
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
