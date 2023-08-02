import type { Authentication, AddAccount } from './../../../domain/use-cases'
import { EmailInUsedError } from '../../errors'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http-helper'
import type { Controller, HttpResponse } from '../../protocols'
import type { Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authantication: Authentication
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const accountValid = await this.addAccount.add({
        name: request.name,
        email: request.email,
        password: request.password
      })

      if (!accountValid) {
        return forbidden(new EmailInUsedError())
      }

      const userAcess = await this.authantication.auth({
        email: request.email,
        password: request.password
      })
      return ok(userAcess)
    } catch (error) {
      return serverError(error)
    }
  }
}
