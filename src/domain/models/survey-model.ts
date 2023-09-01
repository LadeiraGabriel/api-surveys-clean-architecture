export type SurveyModel = {
  id: string
  question: string
  anwers: anwers[]
  date: Date
}

type anwers = {
  anwer: string
  image?: string
}
