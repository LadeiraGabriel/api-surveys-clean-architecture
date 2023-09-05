import type { SurveyResultModel } from '@/domain/models/survey-result-model'

export interface SaveSurveyResult {
  save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result>
}

export namespace SaveSurveyResult {
  export type Params = {
    accountId: string
    surveyId: string
    anwer: string
    date: Date
  }

  export type Result = SurveyResultModel
}
