import type { SaveSurveyResult } from '@/domain/use-cases/save-survey-result'

export interface SaveSurveyResultRepository {
  saveSurveyResult(date: SaveSurveyResultRepository.Params): Promise<SaveSurveyResultRepository.Result>
}

export namespace SaveSurveyResultRepository {
  export type Params = SaveSurveyResult.Params
  export type Result = SaveSurveyResult.Result
}
