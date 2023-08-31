import type { Router } from 'express'
import { adapterRoute } from '@/main/adapters/adapterRoute'
import { makeAddSurveyController } from '@/main/factories/controllers/add-survey'
import { adminAuthMiddleware } from '@/main/middlewares/admin-auth-middleware'
import { authMiddleware } from '@/main/middlewares/auth-middleware'
import { makeLoadSurveysController } from '../factories/controllers/load-surveys'

export default (router: Router): void => {
  router.post('/add-survey', adminAuthMiddleware, adapterRoute(makeAddSurveyController()))
  router.get('/surveys', authMiddleware, adapterRoute(makeLoadSurveysController()))
}
