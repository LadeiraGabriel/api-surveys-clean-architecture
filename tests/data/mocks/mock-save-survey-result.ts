import type { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import type { SaveSurveyResult } from '@/domain/use-cases/save-survey-result'

export class SaveSurveyByIdRepositorySpy implements SaveSurveyResultRepository {
  data: SaveSurveyResult.Params
  result = null
  async saveSurveyResult (data: SaveSurveyResult.Params): Promise<void> {
    this.data = data
    return this.result
  }
}

export const mockSaveSurveyByIdRepositorySpy = (): SaveSurveyByIdRepositorySpy => {
  return new SaveSurveyByIdRepositorySpy()
}
