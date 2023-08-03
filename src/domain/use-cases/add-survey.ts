export interface AddSurvey {
  add (data: AddSurvey.Params): AddSurvey.Result
}

type anwers = {
  anwer: string
  image: string
}

export namespace AddSurvey {
  export type Params = {
    question: string
    anwers: anwers[]
  }
  export type Result = Promise<void>
}
