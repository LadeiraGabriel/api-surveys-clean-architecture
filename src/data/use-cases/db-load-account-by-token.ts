import type { LoadAccountByToken } from '../../domain/use-cases/load-account-by-token'
import type { Decrypter } from '../protocols/cryptography/descrypter'
import type { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository, private readonly decrypter: Decrypter) { }
  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    await this.decrypter.decrypt(accessToken)
    return await this.loadAccountByTokenRepository.loadAccountByToken(accessToken, role)
  }
}
