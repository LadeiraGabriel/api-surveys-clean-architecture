import { DbLoadAnwersBySurvey } from '@/data/use-cases/db-load-anwers-by-survey'
import { DbSaveSurveyResult } from '@/data/use-cases/db-save-survey-result'
import { LogPrismaRepository } from '@/infra/db/prisma/log-prisma-repository'
import { SurveyPrismaRepository } from '@/infra/db/prisma/survey-prisma-repository'
import { SurveyResultPrismaRepository } from '@/infra/db/prisma/survey-result-prisma-repository'
import { LogControllerDecorator } from '@/main/decorator/log-controller-decorator'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result-controller'
import type { Controller } from '@/presentation/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const logPrimsRepository = new LogPrismaRepository()
  const surveyResultPrismaRepository = new SurveyResultPrismaRepository()
  const surveyPrismaRepository = new SurveyPrismaRepository()
  const dbSaveSurveyResult = new DbSaveSurveyResult(surveyResultPrismaRepository, surveyResultPrismaRepository)
  const dbLoadAnwersBySurvey = new DbLoadAnwersBySurvey(surveyPrismaRepository)
  const saveSurveyResultController = new SaveSurveyResultController(dbLoadAnwersBySurvey, dbSaveSurveyResult)
  return new LogControllerDecorator(saveSurveyResultController, logPrimsRepository)
}
