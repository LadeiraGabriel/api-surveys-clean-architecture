export const surveySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    anwers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnwer'
      }
    },
    date: {
      type: 'string'
    }
  }
}
