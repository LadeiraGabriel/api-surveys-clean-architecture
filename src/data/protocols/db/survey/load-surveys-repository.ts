import type { LoadSurveys } from '../../../../domain/use-cases'

export interface LoadSurveysRepository {
  loadSurveys (): Promise<LoadSurveysRepository.Result[]>
}

export namespace LoadSurveysRepository {
  export type Result = LoadSurveys.Result
}
