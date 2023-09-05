import type { CheckSurveyById } from '@/domain/use-cases/check-survey-by-id'

export interface CheckSurveyByIdRepository {
  checkById (id: string): Promise<CheckSurveyById.Result>
}

export namespace CheckSurveyByIdRepository {
  export type Result = CheckSurveyById.Result
}
