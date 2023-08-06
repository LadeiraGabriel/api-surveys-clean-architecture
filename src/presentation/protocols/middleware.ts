import type { HttpResponse } from './index'

export interface Middleware {
  handle (request: any): Promise<HttpResponse>
}
