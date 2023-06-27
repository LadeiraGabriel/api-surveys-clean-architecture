import type { Router } from 'express'
import { adapterRoute } from '../adapters/adapterRoute'
import { makeSignUpController } from '../factories/signup'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpController()))
}
