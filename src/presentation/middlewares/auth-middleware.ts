import type { LoadAccountByToken } from '@/domain/use-cases/load-account-by-token'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import type { HttpResponse } from '@/presentation/protocols'
import type { Middleware } from '@/presentation/protocols/middleware'

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
