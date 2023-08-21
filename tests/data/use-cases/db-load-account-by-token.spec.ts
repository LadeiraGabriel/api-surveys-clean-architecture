import type { Decrypter } from '../../../src/data/protocols/cryptography/descrypter'
import type { LoadAccountByTokenRepository } from '../../../src/data/protocols/db/account/load-account-by-token-repository'
import { DbLoadAccountByToken } from '../../../src/data/use-cases/db-load-account-by-token'
import { mockdecrypterStub } from '../mocks/mock-cryptography'
import { mockLoadAccountByTokenRepositoryStub } from '../mocks/mock-db-account'

type SutType = {
  sut: DbLoadAccountByToken
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
  decrypterStub: Decrypter
}

const makeSut = (): SutType => {
  const decrypterStub = mockdecrypterStub()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken(loadAccountByTokenRepositoryStub, decrypterStub)
  return {
    sut,
    loadAccountByTokenRepositoryStub,
    decrypterStub
  }
}

describe('Db load account by token use case', () => {
  test('should call decrypter with access token', async () => {
    const accessToken: string = 'any_token'
    const role = 'any_role'
    const { sut, decrypterStub } = makeSut()
    const spyDecript = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load(accessToken, role)
    expect(spyDecript).toHaveBeenCalledWith(accessToken)
  })

  test('should return null if decrypter return null', async () => {
    const accessToken: string = 'any_token'
    const role = 'any_role'
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.load(accessToken, role)
    expect(result).toBeNull()
  })

  test('should return null if decrypter throws', async () => {
    const accessToken: string = 'any_token'
    const role = 'any_role'
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const result = await sut.load(accessToken, role)
    expect(result).toBeNull()
  })
  test('should call load account by token repository with correct values', async () => {
    const accessToken: string = 'any_token'
    const role = 'any_role'
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const spyLoad = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadAccountByToken')
    await sut.load(accessToken, role)
    expect(spyLoad).toHaveBeenCalledWith(accessToken, role)
  })

  test('should throws if loadAccountByTokenRepository throws', async () => {
    const accessToken: string = 'any_token'
    const role = 'any_role'
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadAccountByToken').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = sut.load(accessToken, role)
    await expect(result).rejects.toThrow()
  })

  test('should return id on success', async () => {
    const accessToken: string = 'any_token'
    const role = 'any_role'
    const { sut } = makeSut()
    const result = await sut.load(accessToken, role)
    expect(result).toEqual({ id: 'any_id' })
  })
})
