import type { SurveyResultModel } from '@/domain/models/survey-result-model'

export interface LoadSurveyResultRepository {
  loadBySurveyId (accountId: string, surveyId: string,): Promise<LoadSurveyResultRepository.Result>
}

export namespace LoadSurveyResultRepository {
  export type Result = SurveyResultModel
}
