import type { SurveyResultModel } from '@/domain/models/survey-result-model'

export interface LoadSurveyResult {
  load (data: LoadSurveyResult.Params): Promise<LoadSurveyResult.Result>
}

export namespace LoadSurveyResult {
  export type Params = {
    accountId: string
    surveyId: string
  }

  export type Result = SurveyResultModel
}
