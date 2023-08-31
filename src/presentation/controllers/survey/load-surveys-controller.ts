import type { LoadSurveys } from '@/domain/use-cases'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import type { Controller, HttpResponse } from '@/presentation/protocols'

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
