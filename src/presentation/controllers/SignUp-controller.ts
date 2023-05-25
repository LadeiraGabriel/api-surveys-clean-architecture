import { MissingParamError } from '../errors/Missing-param-error'
import { badRequest } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { HttpResponse } from '../protocols/http'
import type { EmailValitor } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/Invalid-param-error'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValitor) {}

  handle (request: any): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    const { email } = request
    for (const field of requiredFields) {
      if (!request[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
