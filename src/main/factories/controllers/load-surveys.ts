import { DbLoadSurveys } from '@/data/use-cases/db-load-surveys'
import { LogPrismaRepository } from '@/infra/db/prisma/log-prisma-repository'
import { SurveyPrismaRepository } from '@/infra/db/prisma/survey-prisma-repository'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys-controller'
import type { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorator/log-controller-decorator'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysRepository = new SurveyPrismaRepository()
  const dbLoadSurveys = new DbLoadSurveys(loadSurveysRepository)
  const loadSurveysController = new LoadSurveysController(dbLoadSurveys)
  const logRepository = new LogPrismaRepository()
  return new LogControllerDecorator(loadSurveysController, logRepository)
}
