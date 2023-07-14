import { badRequest, ok, serverError, unauthorized } from '../helpers/http-helper'
import type { HttpResponse, Validation } from '../protocols'
import type { Authentication } from './../../domain/use-cases/Authentication'
import type { Controller } from './../protocols/controller'
export class LoginController implements Controller {
  constructor (private readonly valdaition: Validation, private readonly authentication: Authentication) {}
  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.valdaition.validate(request)
      if (error) {
        return badRequest(error)
      }
      const isAuthaticated = await this.authentication.auth(request)
      if (!isAuthaticated) {
        return unauthorized()
      }
      return ok(isAuthaticated)
    } catch (e) {
      return serverError(e)
    }
  }
}
