import type { Express } from 'express'
import setupMiddleware from './middleware'
import setupRoutes from './router'
import express from 'express'
export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddleware(app)
  setupRoutes(app)
  return app
}
