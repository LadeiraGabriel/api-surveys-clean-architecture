import type { CheckAccounByEmailRepository } from '@/data/protocols/db/account/check-account-by-email-repository'
import type { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { DbAddAccount } from '@/data/use-cases/db-add-acount'
import { HasherSpy, mockFakeAccount } from '@/tests/data/mocks/mock-cryptography'
import { AddAccountRepositoryStub, CheckAccounByEmailRepositoryStub } from '@/tests/data/mocks/mock-db-account'

type SutType = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositoryStub: AddAccountRepository
  checkAccounByEmailRepositoryStub: CheckAccounByEmailRepository
}

const makeSut = (): SutType => {
  const checkAccounByEmailRepositoryStub = new CheckAccounByEmailRepositoryStub()
  const hasherSpy = new HasherSpy()
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositoryStub, checkAccounByEmailRepositoryStub)
  return {
    sut,
    hasherSpy,
    addAccountRepositoryStub,
    checkAccounByEmailRepositoryStub
  }
}

describe('Db Add Account', () => {
  describe('check Account By Email Repository', () => {
    test('Should call checkAccountByEmailRepository with correct value', async () => {
      const account = mockFakeAccount()
      const { sut, checkAccounByEmailRepositoryStub } = makeSut()
      const checkSpy = jest.spyOn(checkAccounByEmailRepositoryStub, 'checkByEmail')
      await sut.add(account)
      expect(checkSpy).toHaveBeenCalledWith(account.email)
    })

    test('Should return false if checkAccountByEmailRepository return true', async () => {
      const account = mockFakeAccount()
      const { sut, checkAccounByEmailRepositoryStub } = makeSut()
      jest.spyOn(checkAccounByEmailRepositoryStub, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))
      const result = await sut.add(account)
      expect(result).toBeFalsy()
    })

    test('Should throws if checkAccountByEmailRepository throws', async () => {
      const account = mockFakeAccount()
      const { sut, checkAccounByEmailRepositoryStub } = makeSut()
      jest.spyOn(checkAccounByEmailRepositoryStub, 'checkByEmail').mockReturnValueOnce(Promise.reject(new Error()))
      const promise = sut.add(account)
      await expect(promise).rejects.toThrow()
    })
  })
  describe('Hasher', () => {
    test('Should call Hasher with correct value', async () => {
      const account = mockFakeAccount()
      const { sut, hasherSpy } = makeSut()
      await sut.add(account)
      expect(hasherSpy.value).toEqual(account.password)
    })
    test('Should throw if Hasher throw', async () => {
      const account = mockFakeAccount()
      const { sut, hasherSpy } = makeSut()
      jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.add(account)
      await expect(promise).rejects.toThrow()
    })
  })
  describe('add Account Repository', () => {
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
      jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
        throw new Error()
      })
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
  })

  test('Should return true on success', async () => {
    const account = mockFakeAccount()
    const { sut } = makeSut()
    const result = await sut.add(account)
    expect(result).toBeTruthy()
  })
})
