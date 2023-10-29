export interface LoadAnwersBySurvey {
  loadAnwers (id: string): Promise<LoadAnwersBySurvey.Result>
}

export namespace LoadAnwersBySurvey {
  export type Result = string[]
}
