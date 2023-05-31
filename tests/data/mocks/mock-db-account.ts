import type { CheckAccounByEmailRepository } from '../../../src/data/protocols/db/account/check-account-by-email-repository'

export class CheckAccounByEmailRepositoryStub implements CheckAccounByEmailRepository {
  async checkByEmail (email: CheckAccounByEmailRepository.Params): Promise<CheckAccounByEmailRepository.Result> {
    return Promise.resolve(true)
  }
}
