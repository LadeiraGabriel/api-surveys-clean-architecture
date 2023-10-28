import type { SurveyResultModel } from '@/domain/models/survey-result-model'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'

class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
  async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    return Promise.resolve({
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
    })
  }
}

export const makeLoadSurveyResultRepositoryStub = (): LoadSurveyResultRepository => {
  return new LoadSurveyResultRepositoryStub()
}
