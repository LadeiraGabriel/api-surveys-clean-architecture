import type { LoadAccountByTokenRepository } from '../../../src/data/protocols/db/account/load-account-by-token-repository'
import { DbLoadAccountByToken } from '../../../src/data/use-cases/db-load-account-by-token'
import { mockLoadAccountByTokenRepositoryStub } from '../mocks/mock-db-account'

type SutType = {
  sut: DbLoadAccountByToken
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository

}

const makeSut = (): SutType => {
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken(loadAccountByTokenRepositoryStub)
  return {
    sut,
    loadAccountByTokenRepositoryStub
  }
}

describe('Db load account by token use case', () => {
  test('should call load account by token repository with correct values', async () => {
    const accessToken: string = 'any_token'
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const spyLoad = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadAccountByToken')
    await sut.load(accessToken, 'any_role')
    expect(spyLoad).toHaveBeenCalledWith(accessToken)
  })
})
