import { LogControllerDecorator } from '../../../src/main/decorator/log-controller-decorator'
import { ControllerStub } from '../mocks/mock-controller'

type SutType = {
  controller: ControllerStub
  sut: LogControllerDecorator
}
const makeSut = (): SutType => {
  const controller = new ControllerStub()
  const sut = new LogControllerDecorator(controller)
  return {
    controller,
    sut
  }
}

describe('Log Decorator', () => {
  test('should call method handle with correct values', async () => {
    const request = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfimation: 'any_password'
    }
    const { sut, controller } = makeSut()
    const handleSpy = jest.spyOn(controller, 'handle')
    await sut.handle(request)
    expect(handleSpy).toHaveBeenCalledWith(request)
  })
})
