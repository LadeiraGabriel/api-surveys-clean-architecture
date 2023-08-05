import type { Router } from 'express'
import { adapterRoute } from '../adapters/adapterRoute'
import { makeAddSurveyController } from '../factories/controllers/add-survey'

export default (router: Router): void => {
  router.post('/add-survey', adapterRoute(makeAddSurveyController()))
}
