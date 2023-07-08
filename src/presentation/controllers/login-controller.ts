import type { HttpResponse } from '../protocols'
import type { Authentication } from './../../domain/use-cases/Authentication'
import type { Controller } from './../protocols/controller'
export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication) {}
  async handle (request: any): Promise<HttpResponse> {
    await this.authentication.auth(request)
    return Promise.resolve({
      statusCode: 200,
      body: ''
    })
  }
}
