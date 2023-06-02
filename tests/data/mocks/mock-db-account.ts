import type { CheckAccounByEmailRepository } from '../../../src/data/protocols/db/account/check-account-by-email-repository'
import type { AddAccountRepository } from '../../../src/data/protocols/db/account/add-account-repository'

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
