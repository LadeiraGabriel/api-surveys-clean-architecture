import type { Middleware } from '@/presentation/protocols/middleware'
import type { LoadAccountByToken } from '@/domain/use-cases/load-account-by-token'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { mockLoadAccountByTokenSpy } from '@/tests/presentation/mocks'

type SutType = {
  sut: Middleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutType => {
  const loadAccountByTokenStub = mockLoadAccountByTokenSpy()
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
    const httpReponse = await sut.handle(request)
    expect(httpReponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call loadAccountByToken with correct values', async () => {
    const request = {
      accessToken: 'any_token'
    }
    const { sut, loadAccountByTokenStub } = makeSut()
    const spyload = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(request)
    expect(spyload).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('should return 403 if loadAccountByToken return null', async () => {
    const request = {
      accessToken: 'any_token'
    }
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const httpReponse = await sut.handle(request)
    expect(httpReponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return 500 if loadAccountByToken throws', async () => {
    const request = {
      accessToken: 'any_token'
    }
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpReponse = await sut.handle(request)
    expect(httpReponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const request = {
      accessToken: 'any_token'
    }
    const { sut } = makeSut()
    const httpReponse = await sut.handle(request)
    expect(httpReponse).toEqual(ok({ accountId: 'any_id' }))
  })
})
