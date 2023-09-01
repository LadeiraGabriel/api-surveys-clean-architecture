import type { SurveyModel } from '@/domain/models/survey-model'

export interface AddSurvey {
  add (data: AddSurvey.Params): AddSurvey.Result
}

export namespace AddSurvey {
  export type Params = Omit<SurveyModel, 'id'>
  export type Result = Promise<void>
}
