import type { Controller, HttpResponse } from '../../../src/presentation/protocols'

export class ControllerStub implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    return Promise.resolve(null)
  }
}
