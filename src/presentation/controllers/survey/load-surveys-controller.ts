import type { LoadSurveys } from '../../../domain/use-cases'
import { ok } from '../../helpers/http-helper'
import type { Controller, HttpResponse } from '../../protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (): Promise<HttpResponse> {
    const listSurveys = await this.loadSurveys.load()
    return ok(listSurveys)
  }
}
