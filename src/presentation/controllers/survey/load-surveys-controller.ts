import type { LoadSurveys } from '../../../domain/use-cases'
import type { Controller, HttpResponse } from '../../protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return Promise.resolve({
      statusCode: 200,
      body: ''
    })
  }
}
