import type { LoadAccountByTokenRepository } from '../../../src/data/protocols/db/account/load-account-by-token-repository'
import { DbLoadAccountByToken } from '../../../src/data/use-cases/db-load-account-by-token'

describe('Db load account by token use case', () => {
  test('should call load account by token repository with correct values', async () => {
    class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
      async loadAccountByToken (accessToken: string): Promise<LoadAccountByTokenRepository.Result> {
        return Promise.resolve(null)
      }
    }
    const loadAccountByTokenRepositoryStub = new LoadAccountByTokenRepositoryStub()
    const accessToken: string = 'any_token'
    const sut = new DbLoadAccountByToken(loadAccountByTokenRepositoryStub)
    const spyLoad = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadAccountByToken')
    await sut.load(accessToken, 'any_role')
    expect(spyLoad).toHaveBeenCalledWith(accessToken)
  })
})
