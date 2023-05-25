import type { Controller } from '../protocols/controller'
import type { HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  handle (request: any): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!request[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`)

        }
      }
    }
  }
}
