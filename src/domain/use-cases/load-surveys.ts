import type { SurveyModel } from '@/domain/models/survey-model'

export interface LoadSurveys {
  load (): Promise<LoadSurveys.Result[]>
}

export namespace LoadSurveys{
  export type Result = SurveyModel
}
