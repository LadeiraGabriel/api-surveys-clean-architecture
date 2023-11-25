import type { SurveyResultModel } from '@/domain/models/survey-result-model'

export interface LoadSurveyResult {
  load (accountId: string, surveyId: string): Promise<LoadSurveyResult.Result>
}

export namespace LoadSurveyResult {
  export type Result = SurveyResultModel
}
