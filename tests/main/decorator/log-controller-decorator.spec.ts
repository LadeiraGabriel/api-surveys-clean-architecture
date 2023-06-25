import { LogControllerDecorator } from '../../../src/main/decorator/log-controller-decorator'
import type { Controller, HttpResponse } from '../../../src/presentation/protocols'

describe('Log Decorator', () => {
  test('should call method handle with correct values', async () => {
    class ControllerStub implements Controller {
      async handle (request: any): Promise<HttpResponse> {
        return Promise.resolve(null)
      }
    }
    const request = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfimation: 'any_password'
    }
    const controller = new ControllerStub()
    const sut = new LogControllerDecorator(controller)
    const handleSpy = jest.spyOn(controller, 'handle')
    await sut.handle(request)
    expect(handleSpy).toHaveBeenCalledWith(request)
  })
})
