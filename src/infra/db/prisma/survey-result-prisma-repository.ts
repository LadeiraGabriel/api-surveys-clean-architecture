import type { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'

export class SurveyResultPrismaRepository implements SaveSurveyResultRepository {
  async saveSurveyResult (data: SaveSurveyResultRepository.Params): Promise<void> {
    const existResult = await prismaClientHelper.surveyResult.findFirst({
      where: {
        surveyId: data.surveyId,
        accountId: data.accountId
      }
    })
    if (!existResult) {
      await prismaClientHelper.surveyResult.create({
        data: {
          accountId: data.accountId,
          surveyId: data.surveyId,
          anwer: data.anwer,
          date: new Date()
        }
      })
    } else {
      await prismaClientHelper.surveyResult.update({
        where: {
          id: existResult.id
        },
        data: {
          anwer: data.anwer,
          date: new Date()
        }
      })
    }

    return Promise.resolve(null)
  }
}
