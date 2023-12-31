import { ServerError } from '../errors'
import { Unauthorized } from '../errors/unauthorized'
import type { HttpResponse } from '../protocols/http'

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new Unauthorized()
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})
export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
