export const addSurveyPath = {
  post: {
    security: [{
      apiKeyAuth: ['admin']
    }],
    tags: ['Add Survey'],
    summary: 'API para criar enquetes',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addSurveyParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'successfully created'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
