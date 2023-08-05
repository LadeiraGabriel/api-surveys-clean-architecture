import { AccessDeniedError } from '../../../src/presentation/errors/access-denied-error'
import { forbidden } from '../../../src/presentation/helpers/http-helper'
import { AuthMiddleware } from '../../../src/presentation/middlewares/auth-middleware'

describe('Auth middleware', () => {
  test('should return 403 if x-access-token is empty in header', async () => {
    const request = {}
    const sut = new AuthMiddleware()
    const httpReponse = await sut.auth(request)
    expect(httpReponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
