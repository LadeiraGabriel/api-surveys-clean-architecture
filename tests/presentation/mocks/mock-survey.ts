import type { LoadSurveys, AddSurvey } from '@/domain/use-cases'
import type { CheckSurveyById } from '@/domain/use-cases/check-survey-by-id'

export const mockRequest = (): AddSurvey.Params => ({
  question: 'any_question',
  anwers: [{
    anwer: 'any_anwern',
    image: 'any_image'
  }],
  date: new Date()
})

export class AddSurveySpy implements AddSurvey {
  data: AddSurvey.Params
  result = null
  async add (data: AddSurvey.Params): AddSurvey.Result {
    this.data = data
    return this.result
  }
}
export const mockAddSurveySpy = (): AddSurveySpy => {
  return new AddSurveySpy()
}

export class LoadSurveysSpy implements LoadSurveys {
  call: boolean = false
  result: LoadSurveys.Result[] = [{
    id: 'any_id',
    question: 'any_question',
    anwers: [
      {
        anwer: 'any_anwer',
        image: 'any_image'
      }
    ],
    date: new Date()
  }]

  async load (): Promise<LoadSurveys.Result[]> {
    this.call = true
    return this.result
  }
}

export const mockLoadSurveysSpy = (): LoadSurveysSpy => {
  return new LoadSurveysSpy()
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  id: string
  result: CheckSurveyById.Result = true
  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}

export const mockCheckSurveyByIdSpy = (): CheckSurveyByIdSpy => {
  return new CheckSurveyByIdSpy()
}
