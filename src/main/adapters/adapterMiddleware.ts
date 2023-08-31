import type { Request, Response, NextFunction } from 'express'
import type { Middleware } from '@/presentation/protocols/middleware'
import type { HttpResponse } from '@/presentation/protocols'

export const adapterMiddleware = (middleware: Middleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {})
    }
    middleware.handle(request).then((httpResponse: HttpResponse) => {
      if (httpResponse.statusCode === 200) {
        Object.assign(req, httpResponse.body)
        next()
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      }
    }).catch(e => {
      console.log(e)
    })
  }
}
