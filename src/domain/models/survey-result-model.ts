export type SurveyResultModel = {
  surveyId: string
  question: string
  anwers: SurveyResultAnswerModel[]
  date: Date
}

type SurveyResultAnswerModel = {
  image?: string
  anwer: string
  count: number
  percent: number
  isCurrentAccountAnwer: boolean
}
