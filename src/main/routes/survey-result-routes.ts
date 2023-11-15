import { adapterRoute } from './../adapters/adapterRoute'
import type { Router } from 'express'
import { makeSaveSurveyResultController } from '../factories/controllers/save-survey-result'
import { authMiddleware } from '../middlewares/auth-middleware'

export default (route: Router): void => {
  route.put('/surveys/:surveyId/results', authMiddleware, adapterRoute(makeSaveSurveyResultController()))
}
