export const signupPath = {
  post: {
    tags: ['Login'],
    summary: 'API para criação de uma conta',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
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
