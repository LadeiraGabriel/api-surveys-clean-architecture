import type { CheckSurveyById } from '@/domain/use-cases/check-survey-by-id'
import type { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly checkSurveyById: CheckSurveyById) { }
  async handle (request: any): Promise<HttpResponse> {
    const { surveyId } = request
    await this.checkSurveyById.checkById(surveyId)
    return Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
}
