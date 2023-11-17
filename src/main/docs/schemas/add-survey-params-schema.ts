export const addSurveyParamsSchema = {
  type: 'object',
  properties: {
    question: {
      type: 'string'
    },
    anwers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnwer'
      }
    }
  },
  required: ['question', 'anwers']
}
