import type { AddSurvey } from './../../../../domain/use-cases/add-survey'
export interface AddSurveyRepository {
  add (data: AddSurveyRepository.Params): AddSurveyRepository.Result
}

export namespace AddSurveyRepository {
  export type Params = AddSurvey.Params
  export type Result = AddSurvey.Result
}
