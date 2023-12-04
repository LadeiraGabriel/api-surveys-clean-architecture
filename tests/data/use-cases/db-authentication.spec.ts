import type { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-by-email-repository'
import type { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { DbAuthentication } from '@/data/use-cases/db-authentication'
import { EncrypterSpy, HashComparerSpy } from '@/tests/data/mocks/mock-cryptography'
import { LoadAccountByEmailRepositorySpy, UpdateAccessTokenRepositorySpy } from '@/tests/data/mocks/mock-db-account'

type SutType = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateaccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutType => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateaccessTokenRepositoryStub = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerSpy, encrypterSpy, updateaccessTokenRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerSpy,
    encrypterSpy,
    updateaccessTokenRepositoryStub
  }
}

describe('Db Authentication', () => {
  test('Should call loadAccountByEmailRepostirory with correct values', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(requiredFields)
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should throws if loadAccountByEmailRepostirory throws', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(requiredFields)
    await expect(promise).rejects.toThrowError()
  })

  test('Should return null if loadAccountByEmailRepostirory return null', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.auth(requiredFields)
    expect(result).toBeNull()
  })

  test('Should call hashCompare with correct values', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, hashComparerSpy } = makeSut()
    const compareSpy = jest.spyOn(hashComparerSpy, 'compare')
    await sut.auth(requiredFields)
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_hash')
  })

  test('Should return null if hashCompare return false', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const result = await sut.auth(requiredFields)
    expect(result).toBeNull()
  })

  test('Should throws if hashCompare throws', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(requiredFields)
    await expect(promise).rejects.toThrowError()
  })

  test('Should call Encrypter with correct values', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, encrypterSpy } = makeSut()
    const encripterSpy = jest.spyOn(encrypterSpy, 'encrypt')
    await sut.auth(requiredFields)
    expect(encripterSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throws if Encrypter throws', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(requiredFields)
    await expect(promise).rejects.toThrowError()
  })

  test('Should call  updateaccessTokenRepository with correct value', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, updateaccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateaccessTokenRepositoryStub, 'update')
    await sut.auth(requiredFields)
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throws if updateaccessTokenRepository throws', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, updateaccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateaccessTokenRepositoryStub, 'update').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(requiredFields)
    await expect(promise).rejects.toThrowError()
  })

  test('Should return name and token on success', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut } = makeSut()
    const result = await sut.auth(requiredFields)
    expect(result).toEqual({
      name: 'any_name',
      accessToken: 'any_token'
    })
  })
})
