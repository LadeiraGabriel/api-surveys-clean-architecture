import { signupPath, loginPath, surveysPath, surveyResultPath } from './paths/'

export default {
  '/signup': signupPath,
  '/login': loginPath,
  '/surveys': surveysPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
