import { ok, serverError, unauthorized } from '../helpers/http-helper'
import type { HttpResponse } from '../protocols'
import type { Authentication } from './../../domain/use-cases/Authentication'
import type { Controller } from './../protocols/controller'
export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication) {}
  async handle (request: any): Promise<HttpResponse> {
    try {
      const isAuthaticate = await this.authentication.auth(request)
      if (!isAuthaticate) {
        return unauthorized()
      }
      return ok(isAuthaticate)
    } catch (e) {
      return serverError(e)
    }
  }
}
