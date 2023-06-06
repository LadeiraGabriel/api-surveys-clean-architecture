import type { Authentication } from '../../domain/use-cases/Authentication'
import type { LoadAccountByEmailRepository } from '../protocols/db/account/load-by-email-repository'

export class DbAthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) { }
  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    await this.loadAccountByEmailRepository.loadByEmail(data.email)
    return Promise.resolve(null)
  }
}
