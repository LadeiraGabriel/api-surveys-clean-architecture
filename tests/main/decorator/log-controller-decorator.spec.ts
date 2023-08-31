import type { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorator/log-controller-decorator'
import { serverError } from '@/presentation/helpers/http-helper'
import { ControllerStub } from '@/tests/main/mocks/mock-controller'

type SutType = {
  logErrorRepositoryStub: LogErrorRepository
  controller: ControllerStub
  sut: LogControllerDecorator
}
const makeSut = (): SutType => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return Promise.resolve(null)
    }
  }
  const logErrorRepositoryStub = new LogErrorRepositoryStub()
  const controller = new ControllerStub()
  const sut = new LogControllerDecorator(controller, logErrorRepositoryStub)
  return {
    logErrorRepositoryStub,
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

  test('should call logErrorRepository if return controller return 500', async () => {
    const request = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfimation: 'any_password'
    }
    const error = new Error()
    const { sut, controller, logErrorRepositoryStub } = makeSut()
    jest.spyOn(controller, 'handle').mockImplementationOnce(async () => {
      return serverError(error)
    })
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    await sut.handle(request)
    expect(logSpy).toHaveBeenCalledWith(error.stack)
  })
})
