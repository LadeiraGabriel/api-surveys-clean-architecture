import { MissingParamError } from '../errors/Missing-param-error'
import { badRequest } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  handle (request: any): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!request[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
