import type { CheckSurveyById } from '@/domain/use-cases/check-survey-by-id'
import type { LoadSurveyResult } from '@/domain/use-cases/load-survey-result'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import type { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly checkSurveyById: CheckSurveyById, private readonly loadSurveyResult: LoadSurveyResult) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { surveyId, accountId } = request
      const checkSurveyId = await this.checkSurveyById.checkById(surveyId)
      if (!checkSurveyId) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(accountId, surveyId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
