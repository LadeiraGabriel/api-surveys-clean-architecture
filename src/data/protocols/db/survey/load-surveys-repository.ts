import type { SurveyModel } from '@/domain/models/survey-model'

export interface LoadSurveysRepository {
  loadSurveys (): Promise<LoadSurveysRepository.Result[]>
}

export namespace LoadSurveysRepository {
  export type Result = SurveyModel
}
