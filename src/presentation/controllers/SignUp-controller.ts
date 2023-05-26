import type { AddAccount } from './../../domain/account/use-cases/add-account'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, forbidden, serverError } from '../helpers/http-helper'
import type { Controller, HttpResponse } from '../protocols'
import type { EmailValitor } from '../../validations/protocols'
import { EmailInUsedError } from '../errors/Email-in-used-error'

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
        return forbidden(new EmailInUsedError())
      }

      return {
        statusCode: 201,
        body: {
          name,
          acessToken: 'any_token'
        }
      }
    } catch (error) {
      return serverError()
    }
  }
}
