import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http-helper'
import type { HttpResponse } from '../protocols'
import type { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  async auth (request: any): Promise<HttpResponse> {
    return Promise.resolve(forbidden(new AccessDeniedError()))
  }
}
