import type { Router } from 'express'
import { adapterRoute } from '../adapters/adapterRoute'
import { makeAddSurveyController } from '../factories/controllers/add-survey'
import { adminAuthMiddleware } from '../../../src/main/middlewares/admin-auth-middleware'
import { authMiddleware } from '../middlewares/auth-middleware'
import { makeLoadSurveysController } from '../factories/controllers/load-surveys'

export default (router: Router): void => {
  router.post('/add-survey', adminAuthMiddleware, adapterRoute(makeAddSurveyController()))
  router.get('/surveys', authMiddleware, adapterRoute(makeLoadSurveysController()))
}
