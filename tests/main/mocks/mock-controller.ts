import { ok } from '../../../src/presentation/helpers/http-helper'
import type { Controller, HttpResponse } from '../../../src/presentation/protocols'

export class ControllerStub implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    return ok('any_data')
  }
}
