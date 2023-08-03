import type { AddSurveyRepository } from '../../../data/protocols/db/survey/add-survey-repository'
import { prismaClientHelper } from '../../helpers/prisma-client-helper'

export class SurveyPrismaRepository implements AddSurveyRepository {
  async add (data: AddSurveyRepository.Params): AddSurveyRepository.Result {
    await prismaClientHelper.survey.create({
      data: {
        question: data.question,
        anwers: {
          createMany: {
            data: data.anwers
          }
        }
      }
    })
  }
}
