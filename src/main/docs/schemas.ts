import {
  accountSchema,
  signupParamsSchema,
  loginParamsSchema,
  addSurveyParamsSchema,
  surveysSchema,
  surveySchema,
  surveyAnwerSchema,
  surveyResultSchema,
  surveyResultAnwerSchema,
  surveyResultParamsSchema,
  errorSchema
} from './schemas/'

export default {
  account: accountSchema,
  signupParams: signupParamsSchema,
  loginParams: loginParamsSchema,
  addSurveyParams: addSurveyParamsSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnwer: surveyAnwerSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnwer: surveyResultAnwerSchema,
  surveyResultParams: surveyResultParamsSchema,
  error: errorSchema
}
