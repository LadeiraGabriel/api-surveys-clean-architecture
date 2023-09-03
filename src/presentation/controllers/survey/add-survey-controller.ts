import type { AddSurvey } from '@/domain/use-cases/add-survey'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helper'
import type { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation, private readonly addSurvey: AddSurvey) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.addSurvey.add({ ...request, date: new Date() })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
