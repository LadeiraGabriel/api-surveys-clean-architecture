import type { Express } from 'express'
import setupStaticPath from './static'
import setupSwagger from './config-swagger'
import setupMiddleware from './middleware'
import setupRoutes from './router'
import express from 'express'
export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupStaticPath(app)
  setupSwagger(app)
  setupMiddleware(app)
  setupRoutes(app)
  return app
}
