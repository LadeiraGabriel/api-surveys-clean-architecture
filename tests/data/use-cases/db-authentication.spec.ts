import type { HashComparer } from '../../../src/data/protocols/cryptography/hash-comparer'
import type { LoadAccountByEmailRepository } from '../../../src/data/protocols/db/account/load-by-email-repository'
import { DbAthentication } from '../../../src/data/use-cases/db-authentication'
import { HashComparerStub } from '../mocks/mock-cryptography'
import { LoadAccountByEmailRepositoryStub } from '../mocks/mock-db-account'

/* receber um email e um password
    metodo para verificar se o email ja existe no banco
    comparar a senha que existe no banco com a senha que foi enviada
    gerar um token usando o id como base
    finalmente devolvendo o nome e o token para o usuario
    loadAccountByEmailRepostirory, HashCompare, Encrypter, updateAcessTokenRepository */

type SutType = {
  sut: DbAthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
}

const makeSut = (): SutType => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
  const hashComparerStub = new HashComparerStub()
  const sut = new DbAthentication(loadAccountByEmailRepositoryStub, hashComparerStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub
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
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(requiredFields)
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_hash')
  })

  test('Should return null if hashCompare return false', async () => {
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const result = await sut.auth(requiredFields)
    expect(result).toBeNull()
  })
})
