import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import type { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'

export class SurveyResultPrismaRepository implements SaveSurveyResultRepository, LoadSurveyResultRepository {
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
  }

  async loadBySurveyId (accountId: string, surveyId: string): Promise<LoadSurveyResultRepository.Result> {
    const isCurrentAccount = await prismaClientHelper.surveyResult.findFirst({
      where: {
        accountId
      }
    })
    const loadResult: loadReturnFromQuery[] = await prismaClientHelper.$queryRaw`SELECT
    surveys.id AS "surveyId",
    surveys.question AS question,
    anwers.anwer AS anwer,
    anwers.image AS image,
    COUNT(surveyresult.anwer) AS count,
    (COUNT(surveyresult.id) * 100 / NULLIF(SUM(COUNT(surveyresult.id)) OVER (), 0)) AS percent,
    CASE WHEN surveyresult.anwer = anwers.anwer THEN true else false END AS isCurrentAccountAnwer,
    surveys.date AS "date"
FROM
    surveys
JOIN
    anwers ON surveys.id = anwers."surveyId"
LEFT JOIN
    surveyresult ON surveys.id = surveyresult."surveyId" AND anwers.anwer = surveyresult.anwer
    WHERE surveys.id = ${surveyId}
GROUP BY
    surveys.id, surveys.question, anwers.anwer, anwers.image, surveyresult.anwer, surveys.date
ORDER BY
    surveys.id, surveys.question, anwers.anwer, surveys.date;`
    if (isCurrentAccount) {
      return loadResultHelper(loadResult, isCurrentAccount.anwer)
    } else {
      return loadResultHelper(loadResult)
    }
  }
}

type loadReturnFromQuery = {
  anwer: string
  count: number
  date: Date
  image: string
  iscurrentaccountanwer: boolean
  percent: number
  question: string
  surveyId: string
}

type SurveyResultAnwerModel = {
  image?: string
  anwer: string
  count: number
  percent: number
  isCurrentAccountAnwer: boolean
}

function loadResultHelper (loadReturnFromQuery: loadReturnFromQuery[], isCurrentAccount?: string): LoadSurveyResultRepository.Result {
  const listAnwer: SurveyResultAnwerModel[] = []
  for (const result of loadReturnFromQuery) {
    listAnwer.push({
      image: result?.image,
      anwer: result.anwer,
      count: Number(result.count),
      percent: Math.floor(Number(result.percent)),
      isCurrentAccountAnwer: result.anwer === isCurrentAccount
    })
  }
  return {
    surveyId: loadReturnFromQuery[0].surveyId,
    question: loadReturnFromQuery[0].question,
    anwers: listAnwer,
    date: loadReturnFromQuery[0].date
  }
}
