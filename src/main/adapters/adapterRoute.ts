import type { Request, Response } from 'express'
import type { Controller, HttpResponse } from '../../presentation/protocols'

export const adapterRoute = (controller: Controller) => {
  return (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {})
    }
    controller.handle(request).then((httpResponse: HttpResponse) => {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }).catch(e => {
      console.log(e)
    })
  }
}
