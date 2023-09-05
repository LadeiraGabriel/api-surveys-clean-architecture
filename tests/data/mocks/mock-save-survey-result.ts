import type { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import type { SurveyResultModel } from '@/domain/models/survey-result-model'
import type { SaveSurveyResult } from '@/domain/use-cases/save-survey-result'

class SaveSurveyByIdRepositoryStub implements SaveSurveyResultRepository {
  async saveSurveyResult (date: SaveSurveyResult.Params): Promise<SurveyResultModel> {
    return {
      surveyId: 'any_survey_id',
      question: 'any_question',
      answers: [],
      date: new Date()
    }
  }
}

export const makeSaveSurveyByIdRepositoryStub = (): SaveSurveyResultRepository => {
  return new SaveSurveyByIdRepositoryStub()
}
