import type { AddAccount } from './../../domain/account/use-cases/add-account'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import type { Controller, HttpResponse } from '../protocols'
import type { EmailValitor } from '../../validations/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValitor,
    private readonly addAccount: AddAccount
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const { name, email, password, passwordConfirmation } = request
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
      const accountValid = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!accountValid) {
        return {
          statusCode: 403,
          body: new Error()
        }
      }
    } catch (error) {
      return serverError()
    }
  }
}
