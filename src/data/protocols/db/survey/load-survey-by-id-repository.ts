import type { SurveyModel } from '@/domain/models/survey-model'

export interface LoadSurveyByIdRepository {
  loadSurveyById (surveyId: LoadSurveyByIdRepository.Params): Promise<LoadSurveyByIdRepository.Result>
}

export namespace LoadSurveyByIdRepository {
  export type Params = string
  export type Result = SurveyModel
}
