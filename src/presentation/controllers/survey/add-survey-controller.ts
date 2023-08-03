import { badRequest } from '../../helpers/http-helper'
import type { Controller, HttpResponse, Validation } from '../../protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) { }
  async handle (request: any): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return Promise.resolve({
      statusCode: 200,
      body: ''
    })
  }
}
