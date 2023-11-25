import type { CheckSurveyById } from '@/domain/use-cases/check-survey-by-id'
import { forbidden } from '@/presentation/helpers/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import type { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly checkSurveyById: CheckSurveyById) { }
  async handle (request: any): Promise<HttpResponse> {
    const { surveyId } = request
    const checkSurveyId = await this.checkSurveyById.checkById(surveyId)
    if (!checkSurveyId) {
      return forbidden(new InvalidParamError('surveyId'))
    }
    return Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
}
