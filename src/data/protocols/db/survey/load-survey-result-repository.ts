import type { SurveyResultModel } from '@/domain/models/survey-result-model'

export interface LoadSurveyResultRepository {
  loadSurveyResult (surveyId: string, accountId: string): Promise<SurveyResultModel>
}
