import type { LoadSurveys } from '../../../domain/use-cases'
import { ok, serverError } from '../../helpers/http-helper'
import type { Controller, HttpResponse } from '../../protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (): Promise<HttpResponse> {
    try {
      const listSurveys = await this.loadSurveys.load()
      return ok(listSurveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
