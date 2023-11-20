export const surveyResultSchema = {
  type: 'object',
  properties: {
    surveyId: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    anwers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyResultAnwer'
      }
    },
    date: {
      type: 'string'
    }
  }
}
