import { DbAddSurvey } from '@/data/use-cases/db-add-survey'
import { LogPrismaRepository } from '@/infra/db/prisma/log-prisma-repository'
import { SurveyPrismaRepository } from '@/infra/db/prisma/survey-prisma-repository'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey-controller'
import type { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorator/log-controller-decorator'
import { makeAddSurveyValidation } from './add-survey-validation'

export const makeAddSurveyController = (): Controller => {
  const dbAddSurvey = new DbAddSurvey(new SurveyPrismaRepository())
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), dbAddSurvey)
  return new LogControllerDecorator(addSurveyController, new LogPrismaRepository())
}
