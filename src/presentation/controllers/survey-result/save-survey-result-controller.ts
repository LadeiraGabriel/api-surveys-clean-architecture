import type { SaveSurveyResult } from './../../../domain/use-cases/save-survey-result'
import type { LoadAnwersBySurvey } from '@/domain/use-cases/load-anwers-by-survey'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import type { Controller, HttpResponse } from '@/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadAnwersBySurvey: LoadAnwersBySurvey, private readonly saveSurveyResult: SaveSurveyResult) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const anwers = await this.loadAnwersBySurvey.loadAnwers(request.surveyId)
      if (!anwers.length) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      let anwerIsValid = false
      for (const anwer of anwers) {
        if (anwer === request.anwer) {
          anwerIsValid = true
          break
        }
      }
      if (!anwerIsValid) {
        return forbidden(new InvalidParamError('anwer'))
      }
      const saveResult = await this.saveSurveyResult.save({
        accountId: request.accountId,
        surveyId: request.surveyId,
        anwer: request.anwer,
        date: new Date()
      })
      return ok(saveResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
