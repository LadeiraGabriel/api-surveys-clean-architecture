export interface LoadSurveys {
  load (): Promise<LoadSurveys.Result[]>
}

export namespace LoadSurveys{
  export type Result = {
    id: string
    question: string
    anwers: anwers[]
  }
}

type anwers = {
  anwer: string
  image?: string
}
