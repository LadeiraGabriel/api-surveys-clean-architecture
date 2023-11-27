import { DbCheckSurveyById } from '@/data/use-cases/db-check-survey-by-id'
import { DbLoadSurveyResult } from '@/data/use-cases/db-load-survey-result'
import { LogPrismaRepository } from '@/infra/db/prisma/log-prisma-repository'
import { SurveyPrismaRepository } from '@/infra/db/prisma/survey-prisma-repository'
import { SurveyResultPrismaRepository } from '@/infra/db/prisma/survey-result-prisma-repository'
import { LogControllerDecorator } from '@/main/decorator/log-controller-decorator'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result-controller'
import type { Controller } from '@/presentation/protocols'

export const makeLoadSurveyResultController = (): Controller => {
  const logPrismaRepository = new LogPrismaRepository()
  const surveyPrismaRepository = new SurveyPrismaRepository()
  const surveyResultPrismaRepository = new SurveyResultPrismaRepository()
  const dbCheckSurveyById = new DbCheckSurveyById(surveyPrismaRepository)
  const dbLoadSurveyResult = new DbLoadSurveyResult(surveyResultPrismaRepository, surveyPrismaRepository)
  const loadSurveyResultController = new LoadSurveyResultController(dbCheckSurveyById, dbLoadSurveyResult)
  return new LogControllerDecorator(loadSurveyResultController, logPrismaRepository)
}
