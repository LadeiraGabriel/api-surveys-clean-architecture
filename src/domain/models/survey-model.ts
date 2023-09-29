export type SurveyModel = {
  id: string
  question: string
  anwers: anwer[]
  date: Date
}

type anwer = {
  anwer: string
  image?: string
}
