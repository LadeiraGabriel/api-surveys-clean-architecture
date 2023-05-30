import type { Hasher } from '../../../../src/data/protocols/cryptography/Hasher'
import { DbAddAccount } from '../../../../src/data/use-cases/db-add-acount'
import { HasherStub, mockFakeAccount } from '../../mocks/mocks-cryptography'

type SutType = {
  sut: DbAddAccount
  hasherStub: Hasher
}

const makeSut = (): SutType => {
  const hasherStub = new HasherStub()
  const sut = new DbAddAccount(hasherStub)
  return {
    sut,
    hasherStub
  }
}

describe('Db Add Account', () => {
  test('Should call Hasher with correct value', async () => {
    const account = mockFakeAccount()
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(account)
    expect(hashSpy).toHaveBeenCalledWith(account.password)
  })

  test('Should throw if Hasher throw', async () => {
    const account = mockFakeAccount()
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })
})
