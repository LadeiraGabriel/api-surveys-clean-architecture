import { MissingParamError } from '../errors'
import { badRequest, ok, serverError, unauthorized } from '../helpers/http-helper'
import type { EmailValitor, HttpResponse } from '../protocols'
import type { Authentication } from './../../domain/use-cases/Authentication'
import type { Controller } from './../protocols/controller'
export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValitor, private readonly authentication: Authentication) {}
  async handle (request: any): Promise<HttpResponse> {
    try {
      const fields = ['email', 'password']
      for (const field of fields) {
        if (!request[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      this.emailValidator.isValid(request.email)
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
