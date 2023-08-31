import type { Authentication } from '@/domain/use-cases/Authentication'
import type { HashComparer, Encrypter } from '@/data/protocols/cryptography'
import type { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '../protocols/db/account'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAcessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(data.email)
    if (account) {
      const compareMatch = await this.hashComparer.compare(data.password, account.password)

      if (compareMatch) {
        const token = await this.encrypter.encrypt(account.id)
        await this.updateAcessTokenRepository.update(account.id, token)
        return {
          name: account.name,
          accessToken: token
        }
      }
    }
    return null
  }
}
