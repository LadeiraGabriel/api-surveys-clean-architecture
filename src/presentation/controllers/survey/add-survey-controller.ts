import type { Controller, HttpResponse, Validation } from '../../protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) { }
  async handle (request: any): Promise<HttpResponse> {
    this.validation.validate(request)
    return Promise.resolve({
      statusCode: 200,
      body: ''
    })
  }
}
