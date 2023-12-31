import type { LoadAccountByToken } from '@/domain/use-cases/load-account-by-token'
import type { Decrypter } from '@/data/protocols/cryptography/descrypter'
import type { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository, private readonly decrypter: Decrypter) { }
  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const accountId = await this.loadAccountByTokenRepository.loadAccountByToken(accessToken, role)
      if (accountId) {
        return accountId
      }
    }
    return null
  }
}
