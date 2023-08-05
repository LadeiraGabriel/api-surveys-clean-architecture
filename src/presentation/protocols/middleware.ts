import type { HttpResponse } from './index'

export interface Middleware {
  auth (request: any): Promise<HttpResponse>
}
