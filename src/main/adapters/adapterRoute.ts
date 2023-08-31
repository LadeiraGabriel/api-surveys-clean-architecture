import type { Request, Response } from 'express'
import type { Controller, HttpResponse } from '@/presentation/protocols'

export const adapterRoute = (controller: Controller) => {
  return (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {})
    }
    controller.handle(request).then((httpResponse: HttpResponse) => {
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
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
