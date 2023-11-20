export const surveyResultAnwerSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string'
    },
    anwer: {
      type: 'string'
    },
    count: {
      type: 'number'
    },
    percent: {
      type: 'number'
    },
    isCurrentAccountAnwer: {
      type: 'boolean'
    }
  }
}
