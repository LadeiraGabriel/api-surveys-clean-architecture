import type { LoadAnwersBySurvey } from '@/domain/use-cases/load-anwers-by-survey'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok } from '@/presentation/helpers/http-helper'
import type { Controller, HttpResponse } from '@/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadAnwersBySurvey: LoadAnwersBySurvey) {}
  async handle (request: any): Promise<HttpResponse> {
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
    return Promise.resolve(ok({}))
  }
}
