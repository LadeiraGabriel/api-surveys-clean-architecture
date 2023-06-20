import type { Express } from 'express'
import setupMiddleware from './middleware'
import express from 'express'
export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddleware(app)
  return app
}
