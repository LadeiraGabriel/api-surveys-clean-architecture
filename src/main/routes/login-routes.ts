import type { Router } from 'express'
import { adapterRoute } from '../adapters/adapterRoute'
import { makeSignUpController } from '../factories/signup'
import { makeLoginController } from '../factories/login'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpController()))
  router.post('/login', adapterRoute(makeLoginController()))
}
