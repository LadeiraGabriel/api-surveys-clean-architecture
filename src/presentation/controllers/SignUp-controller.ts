import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import type { Controller, HttpResponse, EmailValitor } from '../protocols'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValitor) { }

  handle (request: any): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const { email, password, passwordConfirmation } = request
      for (const field of requiredFields) {
        if (!request[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      if (password !== passwordConfirmation) {
        return {
          statusCode: 400,
          body: new InvalidParamError('passwordConfirmation')
        }
      }
    } catch (error) {
      return serverError()
    }
  }
}
