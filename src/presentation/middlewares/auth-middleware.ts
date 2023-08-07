import type { LoadAccountByToken } from '../../domain/use-cases/load-account-by-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import type { HttpResponse } from '../protocols'
import type { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken, private readonly role?: string) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const accountId = await this.loadAccountByToken.load(accessToken, this.role)
        if (accountId) {
          return ok({ accountId: accountId.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
