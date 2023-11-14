export interface LoadAnwersBySurveyRepository {
  loadAnwersBySurvey (id: string): Promise<LoadAnwersBySurveyRepository.Result>
}

export namespace LoadAnwersBySurveyRepository {
  export type Result = string[]
}
