import type { LoadAccountByEmailRepository } from '../../../src/data/protocols/db/account/load-by-email-repository'
import { DbAthentication } from '../../../src/data/use-cases/db-authentication'

/* receber um email e um password
    metodo para verificar se o email ja existe no banco
    comparar a senha que existe no banco com a senha que foi enviada
    gerar um token usando o id como base
    finalmente devolvendo o nome e o token para o usuario
    loadAccountByEmailRepostirory, HashCompare, Encrypter, updateAcessTokenRepository */
describe('Db Authentication', () => {
  test('Should call loadAccountByEmailRepostirory with correct values', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async loadByEmail (plainText: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
        return Promise.resolve({
          id: 'any_id',
          name: 'any_name',
          email: 'any_email',
          password: 'any_hash',
          token: 'any_token'
        })
      }
    }
    const requiredFields = {
      email: 'any_email',
      password: 'any_password'
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAthentication(loadAccountByEmailRepositoryStub)
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(requiredFields)
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email')
  })
})
