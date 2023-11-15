import swaggerConfig from '@/main/docs'
import { setup, serve } from 'swagger-ui-express'
import type { Express } from 'express'
import { noCacheMiddleware } from '../middlewares/no-cache-middleware'

export default (app: Express): void => {
  app.use('/api-docs', noCacheMiddleware, serve, setup(swaggerConfig))
}
