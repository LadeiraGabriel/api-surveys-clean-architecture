import type { LoadAnwersBySurvey } from '@/domain/use-cases/load-anwers-by-survey'
import { ok } from '@/presentation/helpers/http-helper'
import type { Controller, HttpResponse } from '@/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadAnwersBySurvey: LoadAnwersBySurvey) {}
  async handle (request: any): Promise<HttpResponse> {
    await this.loadAnwersBySurvey.loadAnwers(request.surveyId)
    return Promise.resolve(ok({}))
  }
}
