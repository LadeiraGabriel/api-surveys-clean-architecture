import type { LoadAccountByEmailRepository } from '../../../src/data/protocols/db/account/load-by-email-repository'
import { DbAthentication } from '../../../src/data/use-cases/db-authentication'
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
}

const makeSut = (): SutType => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
  const sut = new DbAthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
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
})
