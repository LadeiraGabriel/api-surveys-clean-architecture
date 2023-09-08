import type { SurveyResultModel } from '@/domain/models/survey-result-model'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'

class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
  async loadSurveyResult (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    return Promise.resolve({
      surveyId: 'any_surveyid',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_anwer',
          count: 1,
          percent: 1,
          isCurrentAccountAnswer: true
        }
      ],
      date: new Date()
    })
  }
}

export const makeLoadSurveyResultRepositoryStub = (): LoadSurveyResultRepository => {
  return new LoadSurveyResultRepositoryStub()
}
