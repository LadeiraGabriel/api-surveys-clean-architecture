export interface AddSurvey {
  add (data: AddSurvey.Params): AddSurvey.Result
}

type anwers = {
  anwer: string
  image: string
}

export namespace AddSurvey {
  export type Params = {
    questions: string
    anwers: anwers[]
  }
  export type Result = Promise<void>
}
