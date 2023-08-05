import type { LoadAccountByToken } from '../../domain/use-cases/load-account-by-token'
import type { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) { }
  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    return await this.loadAccountByTokenRepository.loadAccountByToken(accessToken, role)
  }
}
