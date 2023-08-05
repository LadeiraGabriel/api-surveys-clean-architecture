import type { LoadAccountByToken } from '../../domain/load-account-by-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http-helper'
import type { HttpResponse } from '../protocols'
import type { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken, private readonly role?: string) { }
  async auth (request: any): Promise<HttpResponse> {
    const { accessToken } = request
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken, this.role)
    }
    return forbidden(new AccessDeniedError())
  }
}
