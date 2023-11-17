import type { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import type { CheckSurveyByIdRepository } from '@/data/protocols/db/survey/check-survey-by-id-repository'
import type { LoadAnwersBySurveyRepository } from '@/data/protocols/db/survey/load-anwer-by-survey-repository'
import type { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'

export class SurveyPrismaRepository implements AddSurveyRepository, LoadSurveysRepository, CheckSurveyByIdRepository, LoadAnwersBySurveyRepository {
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
        anwers: {
          select: {
            anwer: true,
            image: true
          }
        }
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

  async loadAnwersBySurvey (id: string): Promise<LoadAnwersBySurveyRepository.Result> {
    const anwers: string[] = []
    const loadAnwers = await prismaClientHelper.survey.findUnique({
      where: {
        id
      },
      include: {
        anwers: true
      }
    })
    loadAnwers.anwers.map((objAnwer): null => {
      anwers.push(objAnwer.anwer)
      return null
    })
    return anwers
  }
}
