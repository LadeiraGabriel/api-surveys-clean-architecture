import type { Response } from 'express'
import type { Controller, HttpResponse } from '@/presentation/protocols'

export const adapterRoute = (controller: Controller) => {
  return (req: any, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      accountId: req.accountId
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
