import type { Authentication } from '../../domain/use-cases/Authentication'
import type { Encrypter } from '../protocols/cryptography/Encrypter'
import type { HashComparer } from '../protocols/cryptography/hash-comparer'
import type { LoadAccountByEmailRepository } from '../protocols/db/account/load-by-email-repository'

export class DbAthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository, private readonly hashComparer: HashComparer, private readonly encrypter: Encrypter) { }
  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(data.email)
    if (account) {
      const compareMatch = await this.hashComparer.compare(data.password, account.password)

      if (compareMatch) {
        await this.encrypter.encrypt(account.id)
        return Promise.resolve(null)
      }
      return null
    }
    return null
  }
}
