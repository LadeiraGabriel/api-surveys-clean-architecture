import type { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import type { CheckSurveyByIdRepository } from '@/data/protocols/db/survey/check-survey-by-id-repository'
import type { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'

export class SurveyPrismaRepository implements AddSurveyRepository, LoadSurveysRepository, CheckSurveyByIdRepository {
  async add (data: AddSurveyRepository.Params): AddSurveyRepository.Result {
    await prismaClientHelper.survey.create({
      data: {
        question: data.question,
        date: data.date,
        anwers: {
          createMany: {
            data: data.anwers
          }
        }
      }
    })
  }

  async loadSurveys (): Promise<LoadSurveysRepository.Result[]> {
    const surveys = await prismaClientHelper.survey.findMany({
      include: {
        anwers: true
      }
    })
    return surveys
  }

  async checkById (id: string): Promise<boolean> {
    const survey = await prismaClientHelper.survey.findUnique({
      where: {
        id
      }
    })
    return survey !== null
  }
}
