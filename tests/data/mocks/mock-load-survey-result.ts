import type { SurveyResultModel } from '@/domain/models/survey-result-model'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyId: string
  accountId: string
  result = {
    surveyId: 'any_surveyid',
    question: 'any_question',
    anwers: [
      {
        image: 'any_image',
        anwer: 'any_anwer',
        count: 1,
        percent: 1,
        isCurrentAccountAnwer: true
      }
    ],
    date: new Date()
  }

  async loadBySurveyId (accountId: string, surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.result
  }
}
export const mockLoadSurveyResultRepositorySpy = (): LoadSurveyResultRepositorySpy => {
  return new LoadSurveyResultRepositorySpy()
}
