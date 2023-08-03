import type { AddSurvey } from '../../../domain/use-cases/add-survey'
import { badRequest } from '../../helpers/http-helper'
import type { Controller, HttpResponse, Validation } from '../../protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation, private readonly addSurvey: AddSurvey) { }
  async handle (request: any): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }

    await this.addSurvey.add(request)
    return Promise.resolve({
      statusCode: 200,
      body: ''
    })
  }
}
