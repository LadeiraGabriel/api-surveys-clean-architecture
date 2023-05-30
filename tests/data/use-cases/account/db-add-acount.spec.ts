import type { Hasher } from '../../../../src/data/protocols/cryptography/Hasher'
import type { AddAccountRepository } from '../../../../src/data/protocols/db/add-account-repository'
import { DbAddAccount } from '../../../../src/data/use-cases/db-add-acount'
import { AddAccountRepositoryStub, HasherStub, mockFakeAccount } from '../../mocks/mocks-cryptography'

type SutType = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutType => {
  const hasherStub = new HasherStub()
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
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

  test('Should call addAccountRepository with correct values', async () => {
    const account = mockFakeAccount()
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(account)
    expect(addSpy).toHaveBeenCalledWith({ ...account, password: 'any_hash' })
  })

  test('Should throw if addAccountRepository throw', async () => {
    const account = mockFakeAccount()
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if addAccountRepository return false', async () => {
    const account = mockFakeAccount()
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(false))
    const result = await sut.add(account)
    expect(result).toBeFalsy()
  })
  test('Should return true on success', async () => {
    const account = mockFakeAccount()
    const { sut } = makeSut()
    const result = await sut.add(account)
    expect(result).toBeTruthy()
  })
})
