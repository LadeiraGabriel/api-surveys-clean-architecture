import type { Middleware } from '../../../src/presentation/protocols/middleware'
import type { LoadAccountByToken } from '../../../src/domain/use-cases/load-account-by-token'
import { AccessDeniedError } from '../../../src/presentation/errors/access-denied-error'
import { forbidden, ok, serverError } from '../../../src/presentation/helpers/http-helper'
import { AuthMiddleware } from '../../../src/presentation/middlewares/auth-middleware'
import { mockLoadAccountByToken } from '../mocks'

type SutType = {
  sut: Middleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutType => {
  const loadAccountByTokenStub = mockLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, 'any_role')
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth middleware', () => {
  test('should return 403 if access token is empty', async () => {
    const request = {}
    const { sut } = makeSut()
    const httpReponse = await sut.auth(request)
    expect(httpReponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call loadAccountByToken with correct values', async () => {
    const request = {
      accessToken: 'any_token'
    }
    const { sut, loadAccountByTokenStub } = makeSut()
    const spyload = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.auth(request)
    expect(spyload).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('should return 500 if loadAccountByToken throws', async () => {
    const request = {
      accessToken: 'any_token'
    }
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpReponse = await sut.auth(request)
    expect(httpReponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const request = {
      accessToken: 'any_token'
    }
    const { sut } = makeSut()
    const httpReponse = await sut.auth(request)
    expect(httpReponse).toEqual(ok({ id: 'any_id' }))
  })
})
