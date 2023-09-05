import type { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import type { SaveSurveyResult } from '@/domain/use-cases/save-survey-result'

class SaveSurveyByIdRepositoryStub implements SaveSurveyResultRepository {
  async saveSurveyResult (date: SaveSurveyResult.Params): Promise<void> {
  }
}

export const makeSaveSurveyByIdRepositoryStub = (): SaveSurveyResultRepository => {
  return new SaveSurveyByIdRepositoryStub()
}
