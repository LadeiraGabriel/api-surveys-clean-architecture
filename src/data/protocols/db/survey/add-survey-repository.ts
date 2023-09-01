import type { SurveyModel } from '@/domain/models/survey-model'
export interface AddSurveyRepository {
  add (data: AddSurveyRepository.Params): AddSurveyRepository.Result
}

export namespace AddSurveyRepository {
  export type Params = Omit<SurveyModel, 'id'>
  export type Result = Promise<void>
}
