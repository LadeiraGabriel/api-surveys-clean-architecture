import type { Controller, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) { }
  async handle (request: any): Promise<HttpResponse> {
    const response = await this.controller.handle(request)
    return response
  }
}
